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
          :list="['html5', 'css3', 'js', 'php', 'python', 'git', 'dev']"
          required>
          <template #legend>
            Catégorie
          </template>
          <template #label>
            Une catégorie pertinente svp !
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
export default {
  name: "CreateLink",
  data() {
    return {
      name: "",
      url: "",
      cat: ""
    }
  },

  methods: {
    createLink() {
      let link = {
        name: this.name,
        url: this.url,
        cat: this.cat
      };

      if (this.$serve.checkString(link.name, "name") === true 
        && this.$serve.checkString(link.url, "url") === true) {
        if (link.cat === "") {
          alert("Choisissez la catégorie");
          
        } else {
          link.name = this.$serve.rewriteString(link.name, "name");
          link.url  = this.$serve.rewriteString(link.url, "url");

          this.$serve.postData("/api/links", link)
            .then(() => {
              alert(link.name + " créé !");
              this.$router.go();
            });
        }
      }
    }
  }
}
</script>
