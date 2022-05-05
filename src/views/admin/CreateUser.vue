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
      class="btn-green"/>
  </form>
</template>

<script>
import BtnElt from '@/components/base/BtnElt';
import FieldElt from '@/components/base/FieldElt';
import { checkString, rewriteString, postData } from "@/script/services";

export default {
  name: "CreateUser",
  components: {
    BtnElt,
    FieldElt
  },
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

      if (checkString(user.name, "name") === true && 
        checkString(user.email, "email") === true && 
        checkString(user.pass, "pass") === true) {
        user.name   = rewriteString(user.name, "name");
        user.email  = rewriteString(user.email, "email");

        postData("/api/users", user)
          .then(() => {
            alert(user.name + " créé !");
            this.$router.go();
          });
      }
    }
  }
}
</script>