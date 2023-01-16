<template>
  <form class="container-60lg-50wd">
    <ul>
      <li>
        <FieldElt
          id="name"
          v-model:value="name"
          info="Indiquer le nom du lien"
          @keyup.enter="validateNewLink()"
          min="2"
          max="50">
          <template #legend>
            Nom
          </template>
          <template #label>
            Nom descriptif du lien
          </template>
        </FieldElt>
      </li>

      <li>
        <FieldElt
          id="url"
          type="url"
          v-model:value="url"
          info="Indiquer l'URL du lien"
          @keyup.enter="validateNewLink()"
          min="5"
          max="100">
          <template #legend>
            URL
          </template>
          <template #label>
            Une URL valide svp !
          </template>
        </FieldElt>
      </li>
      
      <li>
        <FieldElt
          id="cat"
          type="list"
          v-model:value="cat"
          info="Choisissez une Catégorie"
          @keyup.enter="validateNewLink()"
          :list="['HTML5', 'CSS3', 'JS', 'PHP', 'Python', 'Git', 'Dev']">
          <template #legend>
            Catégorie
          </template>
          <template #label>
            Choisissez une Catégorie
          </template>
        </FieldElt>

      </li>
    </ul>

    <BtnElt
      type="button"
      content="Créer"
      @click="validateNewLink()" 
      class="green"/>
  </form>
</template>

<script>
import BtnElt from "@/components/base/BtnElt"
import FieldElt from "@/components/base/FieldElt"

export default {
  name: "CreateLink",
  components: {
    BtnElt,
    FieldElt
  },

  data() {
    return {
      name: "",
      url: "",
      cat: ""
    }
  },

  methods: {
    /**
     * VALIDATE NEW LINK IF DATA ARE VALID
     */
    validateNewLink() {
      if (this.$serve.checkUrl(`https://${this.url}`)) {
        if (this.name.length > 1 && this.name.length < 51) {

          if (this.cat === "") {
            this.cat = "HTML5";
          }
          this.checkNewLink();

        } else {
          alert("Le Nom du lien doit comporter entre 2 & 50 caractères !");
        }
      }
    },

    /**
     * CHECK NEW LINK IF NAME | URL ARE REFERENCED
     */
    checkNewLink() {
      this.$serve.getData("/api/links")
        .then((links) => {
          let isReferenced = false;

          for (let i = 0; i < links.length; i++) {

            if (links[i].name === this.name) {
              alert(this.name + " n'est pas disponible !");
              isReferenced = true;
            }

            if (links[i].url === this.url) {
              alert(this.url + " est déjà référencé !");
              isReferenced = true;
            }
          }

          this.createLink(isReferenced);
        });
    },

    /**
     * CREATE LINK IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     */
    createLink(isReferenced) {
      if (!isReferenced) {
        let link = new FormData();

        link.append("name", this.name);
        link.append("url", this.url);
        link.append("cat", this.cat);

        this.$serve.postData("/api/links", link)
          .then(() => {
            alert(link.get("name") + " créé !");
            this.$router.go();
        });
      }
    }
  }
}
</script>
