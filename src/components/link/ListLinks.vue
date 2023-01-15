<template>
  <form>
    <TableElt 
      :title="table[0].cat"
      :items="table"
      v-for="table in itemsByCat(links)"
      :key="table"
      :id="table[0].cat">

      <template #title>
        <i :class="`fa-brands fa-${table[0].cat.toLowerCase()} fa-5x sky anima-grow`"></i>
      </template>

      <template #head>
        crud
      </template>

      <template #cell-_id="slotProps">
        {{ slotProps.index + 1 }}
      </template>

      <template #cell-name="slotProps">
        <FieldElt
          :id="'name-' + table[slotProps.index]._id"
          v-model:value="table[slotProps.index].name"
          info="Indiquer le nom du lien"
          required>
        </FieldElt>
      </template>

      <template #cell-url="slotProps">
        <FieldElt
          :id="'url-' + table[slotProps.index]._id"
          v-model:value="table[slotProps.index].url"
          info="Indiquer l'URL du lien"
          type="url"
          max="100"
          required>
        </FieldElt>
      </template>

      <template #cell-cat="slotProps">
        <FieldElt
          :id="'cat-' + table[slotProps.index]._id"
          v-model:value="table[slotProps.index].cat"
          info="Choisissez une Catégorie"
          type="list"
          :list="['HTML5', 'CSS3', 'JS', 'PHP', 'Python', 'Git', 'Dev']"
          required>
          {{ value }}
        </FieldElt>
      </template>

      <template #body="slotProps">
        <BtnElt
          type="button"
          @click="updateLink(table[slotProps.index]._id)" 
          class="sky"
          title="Modifier">
          <template #btn>
            <i class="fa-solid fa-edit"></i>
          </template>
        </BtnElt>

        <BtnElt
          type="button"
          @click="deleteLink(table[slotProps.index]._id)" 
          class="red"
          title="Supprimer">
          <template #btn>
            <i class="fa-solid fa-trash-alt"></i>
          </template>
        </BtnElt>
      </template>
    </TableElt>
  </form>

</template>

<script>
import TableElt from "@/components/data/TableElt"
import BtnElt from "@/components/base/BtnElt"
import FieldElt from "@/components/base/FieldElt"

export default {
  name: "ListLinks",
  components: {
    TableElt,
    BtnElt,
    FieldElt
  },

  props: ["links"],

  methods: {
    /**
     * RETURN AN ARRAY OF ITEMS BY CATEGORY
     * @param {object} items 
     */
    itemsByCat(items) {
      const itemsByCat = {};

      items.forEach(item => {
        if (!itemsByCat[item.cat]) {
          itemsByCat[item.cat] = [];
        }

        itemsByCat[item.cat].push(item);
        itemsByCat[item.cat].sort((a, b) => (a.name > b.name) ? 1 : -1);
      });

      return itemsByCat;
    },

    /**
     * UPDATE LINK
     * @param {string} id 
     */
    updateLink(id) {
      for (let i = 0; i < this.links.length; i++ ) {
        if (this.links[i]._id === id) {

          if (this.$serve.checkUrl(`https://${this.links[i].url}`)) {

            this.checkUpdatedLink(i);
          }
        }
      }
    },

    /**
     * CHECK UPDATED LINK IF NAME|URL IS ALREADY REFERENCED
     * @param {number} i 
     */
    checkUpdatedLink(i) {
      this.$serve.getData("/api/links")
        .then((links) => {
          let isReferenced = false;

          for (let j = 0; j < links.length; j++) {
            if (links[j]._id === this.links[i]._id) {
              links.splice(j, 1);
            }

            if (links[j] && links[j].name === this.links[i].name) {
              alert(this.links[i].name + " n'est pas disponible !");
              isReferenced = true;
            }

            if (links[j] && links[j].url === this.links[i].url) {
              alert(this.links[i].url+ " est déjà référencé !");
              isReferenced = true;
            }
          }

          this.putUpdatedLink(isReferenced, i);
        });
    },

    /**
     * PUT UPDATED LINK IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     * @param {number} i 
     */
    putUpdatedLink(isReferenced, i) {
      if (!isReferenced) {
        let link = new FormData();

        link.append("id", this.links[i]._id);
        link.append("name", this.links[i].name);
        link.append("url", this.links[i].url);
        link.append("cat", this.links[i].cat);

        this.$serve.putData(`/api/links/${link.get("id")}`, link)
          .then(() => {
            alert(link.get("name") + " modifié !");
            this.$router.go();
          });
      }
    },

    /**
     * DELETE LINK
     * @param {string} id 
     */
    deleteLink(id) {
      let linkName = "";
      
      for (let i = 0; i < this.links.length; i++ ) {
        if (this.links[i]._id === id) {
          linkName = this.links[i].name;
        }
      }

      if (confirm(`Supprimer ${linkName} ?`) === true) {
        this.$serve.deleteData(`/api/links/${id}`)
          .then(() => {
            alert(linkName + " supprimé !");
            this.$router.go();
          });
      }
    }
  }
}
</script>
