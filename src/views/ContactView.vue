<template>
  <CardElt>
    <template #head>
      <h1 class="violet anima-slideB">
        <i class="fa-solid fa-at fa-2x"></i>
        Contact
      </h1>
    </template>

    <template #body>
      <form class="anima-grow">
        <ul>
          <li>
            <FieldElt
              id="name"
              v-model:value="name"
              info="Indiquer votre nom"
              required>
              <template #legend>
                Nom
              </template>
              <template #label>
                Nom et prénom
              </template>
            </FieldElt>
          </li>
          <li>
            <FieldElt
              id="email"
              v-model:value="email"
              info="Indiquer votre email"
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
              id="title"
              v-model:value="title"
              info="Indiquer le titre"
              required>
              <template #legend>
                Titre
              </template>
              <template #label>
                La raison de ce message ?
              </template>
            </FieldElt>
          </li>
          <li>
            <FieldElt
              id="message"
              v-model:value="message"
              info="Indiquer votre message"
              type="area"
              required>
              <template #legend>
                Message
              </template>
              <template #label>
                Soyez bref et précis !
              </template>
            </FieldElt>
          </li>
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
              content="Envoyer"
              @click="send()" 
              class="btn-green"/>
          </li>
        </ul>
      </form>
    </template>
  </CardElt>
</template>

<script>
import BtnElt from '@/components/base/BtnElt';
import FieldElt from '@/components/base/FieldElt';
import CardElt from '@/components/main/CardElt';
import { checkString, rewriteString, postData } from "@/script/services";

export default {
  name: "ContactView",
  components: {
    BtnElt,
    CardElt,
    FieldElt
  },
  data() {
    return {
      name: "",
      email: "",
      title: "",
      message: ""
    }
  },

  methods: {
    send() {
      let message = {
        name: this.name,
        email: this.email,
        title: this.title,
        message: this.message
      };

      if (checkString(message.name, "name") === true 
        && checkString(message.email, "email") === true) {

        message.name  = rewriteString(message.name, "name");
        message.email = rewriteString(message.email, "email");

        postData("/api/users/send", message)
          .then(() => {
            alert(message.title + " envoyé !");
            this.$router.push("/");
          });
        }
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
}
li {
  list-style: none;
}
</style>