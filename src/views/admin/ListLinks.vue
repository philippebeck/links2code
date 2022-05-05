<template>
  <form>
    <TableElt 
      :title="table[0].cat"
      :items="table"
      v-for="table in itemsByCat(links)"
      :key="table"
      :id="table[0].cat">

      <template #title>
        <i :class="`fa-brands fa-${table[0].cat} fa-5x primary anima-grow`"></i>
      </template>

      <template #head>
        crud
      </template>

      <template #cell-_id="slotProps">
        {{ slotProps.index + 1 }}
      </template>

      <template #cell-name="slotProps">
        <FieldElt
          id="name"
          v-model:value="table[slotProps.index].name"
          info="Indiquer le nom du lien"
          required>
        </FieldElt>
      </template>

      <template #cell-url="slotProps">
        <FieldElt
          id="url"
          v-model:value="table[slotProps.index].url"
          info="Indiquer l'URL du lien"
          type="url"
          max="100"
          required>
        </FieldElt>
      </template>

      <template #cell-cat="slotProps">
        <FieldElt
          id="cat"
          v-model:value="table[slotProps.index].cat"
          info="Choisissez une Catégorie"
          type="list"
          :list="['html5', 'css3', 'js', 'php', 'python', 'git', 'dev']"
          required>
          {{ value }}
        </FieldElt>
      </template>

      <template #body="slotProps">
        <BtnElt
          type="button"
          @click="updateLink(table[slotProps.index]._id)" 
          class="btn-blue"
          title="Modifier">
          <template #button>
            <i class="fa-solid fa-edit"></i>
          </template>
        </BtnElt>

        <BtnElt
          type="button"
          @click="deleteLink(table[slotProps.index]._id)" 
          class="btn-red"
          title="Supprimer">
          <template #button>
            <i class="fa-solid fa-trash-alt"></i>
          </template>
        </BtnElt>
      </template>
    </TableElt>
  </form>

</template>

<script>
import BtnElt from '@/components/base/BtnElt';
import FieldElt from '@/components/base/FieldElt';
import TableElt from "@/components/data/TableElt.vue";
import { checkString, rewriteString, putData, deleteData } from "@/script/services";

export default {
  name: "ListLinks",
  props: ["links"],
  components: {
    BtnElt,
    FieldElt,
    TableElt
  },

  methods: {
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

    updateLink(id) {
      let link = {};

      for (let i = 0; i < this.links.length; i++ ) {
        if (this.links[i]._id === id) {
          link = {
            id: this.links[i]._id,
            name: this.links[i].name,
            url: this.links[i].url,
            cat: this.links[i].cat
          }
        }
      }

      if (checkString(link.name, "name") === true 
        && checkString(link.url, "url") === true) {
        if (link.cat === "") {
          alert("Choisissez la catégorie");

        } else {
          link.name = rewriteString(link.name, "name");
          link.url  = rewriteString(link.url, "url");

          putData(`/api/links/${id}`, link)
            .then(() => {
              alert(link.name + " modifié !");
              this.$router.go();
            });
        }
      }
    },

    deleteLink(id) {
      let linkName = "";
      
      for (let i = 0; i < this.links.length; i++ ) {
        if (this.links[i]._id === id) {
          linkName = this.links[i].name;
        }
      }

      if (confirm(`Supprimer ${linkName} ?`) === true) {
        deleteData(`/api/links/${id}`)
          .then(() => {
            alert(linkName + " supprimé !");
            this.$router.go();
          });
      }
    }
  }
}
</script>
