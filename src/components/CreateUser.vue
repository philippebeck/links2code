<template>
  <form class="form width-lg container-60lg-50wd">
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
export default {
  name: "CreateUser",
  data() {
    return {
      name: "",
      email: "",
      pass: "",
    }
  },

  methods: {
    createUser() {
      let user = {
        name: this.name,
        email: this.email,
        pass: this.pass
      };

      if (this.$serve.checkString(user.name, "name") === true && 
        this.$serve.checkString(user.email, "email") === true && 
        this.$serve.checkString(user.pass, "pass") === true) {
        user.name   = this.$serve.rewriteString(user.name, "name");
        user.email  = this.$serve.rewriteString(user.email, "email");

        this.$serve.postData("/api/users", user)
          .then(() => {
            alert(user.name + " créé !");
            this.$router.go();
          });
      }
    }
  }
}
</script>