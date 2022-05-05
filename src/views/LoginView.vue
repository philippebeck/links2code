<template>
  <main>
    <h1 class="violet anima-grow">
      <i class="fa-solid fa-sign-in-alt fa-2x"></i>
      Login
    </h1>
    <form class="form">
      <ul>
        <li>
          <FieldElt
            id="email"
            v-model:value="email"
            info="Indiquer votre identifiant"
            type="email"
            required>
            <template #legend>
              Identifiant
            </template>
            <template #label>
              Vous n'avez rien à faire ici !
            </template>
          </FieldElt>
        </li>
        <li>
          <FieldElt
            id="pass"
            v-model:value="pass"
            info="Indiquer votre mot de passe"
            type="password"
            required>
            <template #legend>
              Mot de Passe
            </template>
            <template #label>
              Vous ne passerez pas !
            </template>
          </FieldElt>
        </li>
      </ul>
      <ul>
        <li>
          <div 
            id="recaptcha" 
            class="g-recaptcha" 
            data-sitekey="6LdTBtoZAAAAADITfTTXpjsctFXZqKXZc-seM9ZL">
          </div>
        </li>
        <li>
          <BtnElt
            type="button"
            content="Connexion"
            @click="login()" 
            class="btn-green"/>
        </li>
      </ul>
    </form>
  </main>
</template>

<script>
import BtnElt from '@/components/base/BtnElt';
import FieldElt from '@/components/base/FieldElt';
import { postData } from "@/script/services";

export default {
  name: "LoginView",
  components: {
    BtnElt,
    FieldElt
  },
  data() {
    return {
      email: "",
      pass: "",
    }
  },

    beforeMount() {
    if (localStorage.userId) {
      this.$router.push("/admin");
    }
  },

  methods: {
    login() {
      let auth = {
          email: this.email,
          pass: this.pass
      };

      postData("/api/users/login", auth)
        .then((res) => {
          let token   = JSON.stringify(res.token);
          let userId  = JSON.stringify(res.userId);

          localStorage.setItem("userToken", token);
          localStorage.setItem("userId", userId);

          this.$router.go("/");
        });
    }
  }
}
</script>