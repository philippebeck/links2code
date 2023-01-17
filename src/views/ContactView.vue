<template>
  <CardElt>
    <template #head>
      <i class="blue fa-solid fa-at fa-2x"></i>
      <h1 class="blue anima-slideB">
        Contact
      </h1>
    </template>

    <template #body>
      <form class="anima-grow">
        <ul>
          <li>
            <FieldElt
              id="email"
              v-model:value="email"
              info="Un email pour vous répondre ?"
              @keyup.enter="send()"
              type="email"
              required>
              <template #legend>
                Email
              </template>
              <template #label>
                Un email fonctionnel svp !
              </template>
            </FieldElt>
          </li>
          <li>
            <FieldElt
              id="subject"
              v-model:value="subject"
              info="Le sujet de votre message ?"
              @keyup.enter="send()"
              required>
              <template #legend>
                Sujet
              </template>
              <template #label>
                Soyez bref et précis !
              </template>
            </FieldElt>
          </li>
          <li>
            <FieldElt
              id="text"
              v-model:value="text"
              info="Le texte de votre message ?"
              @keyup.enter="send()"
              type="area"
              required>
              <template #legend>
                Texte
              </template>
              <template #label>
                Que puis-je faire pour vous ?
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
              class="green"/>
          </li>
        </ul>
      </form>
    </template>
  </CardElt>
</template>

<script>
import CardElt from "@/components/main/CardElt"
import BtnElt from "@/components/base/BtnElt"
import FieldElt from "@/components/base/FieldElt"

export default {
  name: "ContactView",
  components: {
    CardElt,
    BtnElt,
    FieldElt
  },
  data() {
    return {
      email: "",
      subject: "",
      text: ""
    }
  },

  methods: {
    /**
     * SEND A CONTACT MESSAGE
     */
    send() {
      if (this.$serve.checkEmail(this.email) && 
      this.$serve.checkName(this.subject)) {
        let message = new FormData();

        message.append("email", this.email);
        message.append("subject", this.subject);
        message.append("text", this.text);

        this.$serve.postData("/api/users/send", message)
          .then(() => {
            alert(message.get("subject") + " envoyé !");
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
