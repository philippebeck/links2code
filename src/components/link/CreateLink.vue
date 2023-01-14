<template>
  <form class="container-60lg-50wd">
    <ul>
      <li>
        <FieldElt
          id="name"
          v-model:value="name"
          info="Indiquer le nom du lien"
          required>
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
          v-model:value="url"
          info="Indiquer l'URL du lien"
          type="url"
          max="100"
          required>
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
          v-model:value="cat"
          info="Choisissez une Catégorie"
          type="list"
          :list="['HTML5', 'CSS3', 'JS', 'PHP', 'Python', 'Git', 'Dev']"
          required>
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
      @click="createLink()" 
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
    createLink() {
      if (this.$serve.checkUrl(`https://${this.url}`)) {
        let link = new FormData();

        if (this.cat === "") {
          this.cat = "HTML5";
        }

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
