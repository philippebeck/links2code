<template>
  <CardElt>
    <template #header>
      <i class="blue fa-solid fa-at fa-2x"></i>
      <h1 class="blue anima-slideB">
        Contact
      </h1>
    </template>

    <template #body>
      <form class="anima-grow">
        <ListElt :items="['email', 'subject', 'text']">

          <template #item-1>
            <FieldElt id="email"
              v-model:value="email"
              info="An email to answer you ?"
              @keyup.enter="send()"
              type="email">
              <template #legend>
                Email
              </template>
              <template #label>
                A functional email please!
              </template>
            </FieldElt>
          </template>

          <template #item-2>
            <FieldElt id="subject"
              v-model:value="subject"
              info="The subject of your message ?"
              @keyup.enter="send()">
              <template #legend>
                Subject
              </template>
              <template #label>
                Be brief and precise!
              </template>
            </FieldElt>
          </template>

          <template #item-3>
            <FieldElt id="text"
              v-model:value="text"
              info="The text of your message ?"
              @keyup.enter="send()"
              type="area"
              :max="parseInt('100')">
              <template #legend>
                Text
              </template>
              <template #label>
                What can I do for you ?
              </template>
            </FieldElt>
          </template>
        </ListElt>

        <div id="recaptcha" 
          class="g-recaptcha" 
          data-sitekey="">
        </div>

        <BtnElt type="button"
          content="Envoyer"
          @click="send()" 
          class="btn-green"/>
      </form>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: "ContactView",

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
            alert(message.get("subject") + " sended !");
            this.$router.push("/");
          })
          .catch(err => { console.log(err) });
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
