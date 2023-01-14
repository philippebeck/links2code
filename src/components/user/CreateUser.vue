<template>
  <form 
    method="post"
    enctype="multipart/form-data"
    class="form width-lg container-60lg-50wd">
    <ul>
      <li>
        <FieldElt
          id="name"
          v-model:value="name"
          info="Indiquer le nom de l'utilisateur"
          required>
          <template #legend>
            Nom
          </template>
          <template #label>
            Prénom ou Pseudo
          </template>
        </FieldElt>
      </li>

      <li>
        <FieldElt
          id="email"
          v-model:value="email"
          info="Indiquer l'email de l'utilisateur"
          type="email"
          required>
          <template #legend>
            Email
          </template>
          <template #label>
            Un email valide svp !
          </template>
        </FieldElt>
      </li>
      
      <li>
        <FieldElt
          id="image"
          v-model:value="image"
          info="Fournissez l'image de l'utilisateur"
          type="file"
          required>
          <template #legend>
            Image
          </template>
          <template #label>
            Un fichier image svp !
          </template>
        </FieldElt>
      </li>

      <li>
        <FieldElt
          id="pass"
          v-model:value="pass"
          info="Indiquer le mot de passe de l'utilisateur"
          type="password"
          min="8"
          required>
          <template #legend>
            Mot de Passe
          </template>
          <template #label>
            8 caractères mini avec des chiffres et des lettres
          </template>
        </FieldElt>
      </li>
    </ul>

    <BtnElt
      type="button"
      content="Créer"
      @click="createUser()" 
      class="green"/>
  </form>
</template>

<script>
import BtnElt from "@/components/base/BtnElt"
import FieldElt from "@/components/base/FieldElt"

export default {
  name: "CreateUser",
  components: {
    BtnElt,
    FieldElt
  },

  data() {
    return {
      name: "",
      image:"",
      email: "",
      pass: ""
    }
  },

  methods: {
    createUser() {
      if (this.$serve.checkEmail(this.email) && this.$serve.checkPass(this.pass)) {

        let user  = new FormData();
        let image = document.getElementById('image').files[0];

        user.append("name", this.name);
        user.append("email", this.email);
        user.append("image", image);
        user.append("pass", this.pass);

        this.$serve.postData("/api/users", user)
          .then(() => {
            alert(user.get("name") + " créé !");
            this.$router.go();
          });
      }
    }
  }
}
</script>