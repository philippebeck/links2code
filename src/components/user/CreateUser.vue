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
          @keyup.enter="validateNewUser()"
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
          @keyup.enter="validateNewUser()"
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
          @keyup.enter="validateNewUser()"
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
      @click="validateNewUser()" 
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
    /**
     * VALIDATE NEW USER IF EMAIL & PASS ARE VALID
     */
    validateNewUser() {
      if (this.$serve.checkEmail(this.email) && this.$serve.checkPass(this.pass)) {

        this.checkNewUser();
      }
    },

    /**
     * CHECK NEW USER IF NAME | EMAIL ARE REFERENCED
     */
    checkNewUser() {
      this.$serve.getData("/api/users")
        .then((users) => {
          let isReferenced = false;

          for (let i = 0; i < users.length; i++) {

            if (users[i].name === this.name) {
              alert(this.name + " n'est pas disponible !");
              isReferenced = true;
            }

            if (users[i].email === this.email) {
              alert(this.email + " est déjà référencé !");
              isReferenced = true;
            }
          }

          this.createUser(isReferenced);
        });
    },

    /**
     * CREATE USER IF NO INFO IS REFERENCED
     * @param {boolean} isReferenced 
     */
    createUser(isReferenced) {
      if (!isReferenced) {
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