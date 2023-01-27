<template>
  <NavElt :items="['links', 'contact']">
    <template #brand>
      <img class="anima-slideB"
        src="/img/logo.svg"
        alt="Logo Phi">
    </template>

    <template #links>
      <i class="fa-solid fa-link fa-fw"></i>
    </template>
    <template #contact>
      <i class="fa-brands fa-at fa-fw"></i>
    </template>

    <template #admin>
      <ListElt v-if="!userId"
        :items="['paypal', 'github', 'login']">

        <template #items-1>
          <a href="https://paypal.me/philippebeck"
            title="Donation">
            <i class="fa-brands fa-paypal fa-fw"></i>
          </a>
        </template>

        <template #items-2>
          <a href="https://github.com/sponsors/philippebeck"
            title="Sponsor">
            <i class="fa-regular fa-heart fa-fw"></i>
          </a>
        </template>

        <template #items-3>
          <a href="/login"
            title="Login">
            <i class="fa-solid fa-sign-in-alt fa-fw"></i>
          </a>
        </template>
      </ListElt>

      <ListElt v-else
        :items="['admin', 'logout']">
        <template #items-1>
          <a href="/admin"
            title="Admin">
            <i class="fa-solid fa-user-ninja fa-fw"></i>
          </a>
        </template>

        <template #items-2>
          <button type="button"
            @click="logout()"
            title="Logout">
            <i class="fa-solid fa-sign-out-alt fa-fw"></i>
          </button>
        </template>
      </ListElt>
    </template>
  </NavElt>

  <main>
    <router-view/>
  </main>
  
  <FootElt>
    <template #foot1>
      <ListElt :items="['Asperger', 'Astronomy']">
        <template #items-1>
          <a href="https://asperger.philippebeck.net"
            title="Tests for Asperger's Syndrome">
            Asperger
          </a>
        </template>
        <template #items-2>
          <a href="https://astronomy.philippebeck.net"
            title="NASA & CDS APIs">
            Astronomy
          </a>
        </template>
      </ListElt>
    </template>

    <template #foot2>
      <ListElt :items="['Vue-Elt', 'Servidio', 'Animadio', 'NemJS', 'Vesan']">
        <template #items-1>
          <a
            href="https://www.npmjs.com/package/vue-elt"
            title="Vue Single File Component Library">
            Vue-Elt
          </a>
        </template>
        <template #items-2>
          <a href="https://www.npmjs.com/package/servidio"
            title="JavaScript Frontend Services">
            Servidio
          </a>
        </template>
        <template #items-3>
          <a href="https://www.npmjs.com/package/animadio"
            title="Animadio CSS Library">
            Animadio
          </a>
        </template>
        <template #items-4>
          <a href="https://www.npmjs.com/package/nemjs"
            title="JavaScript Backend Services">
            Nemjs
          </a>
        </template>
        <template #items-5>
          <a href="https://www.npmjs.com/package/vesan"
            title="CMS with Vue-Elt, Servidio, Animadio & NemJS">
            Vesan
          </a>
        </template>
      </ListElt>
    </template>

    <template #foot3>
      <ListElt :items="['Links2Code', 'Philippe Beck']">
        <template #items-1>
          <a href="https://links2code.philippebeck.net"
            title="Links For Coding">
            Links2Code
          </a>
        </template>
        <template #items-2>
          <a href="https://philippebeck.net"
            title="Portal">
            Philippe Beck
          </a>
        </template>
      </ListElt>
    </template>

    <template #foot>
      <ListElt :items="['GitHub', 'Twitter', 'LinkedIn', 'CodePen']">
        <template #items-1>
          <a href="https://github.com/philippebeck"
            title="Philippe Beck @GitHub">
            <i class="fa-brands fa-github fa-2x fa-fw black"></i>
          </a>
        </template>
        <template #items-2>
          <a href="https://twitter.com/ph_beck"
            title="Philippe Beck @Twitter">
            <i class="fa-brands fa-twitter fa-2x fa-fw sky"></i>
          </a>
        </template>
        <template #items-3>
          <a href="https://www.linkedin.com/in/philippebeck"
            title="Philippe Beck @LinkedIn">
            <i class="fa-brands fa-linkedin-in fa-2x fa-fw blue"></i>
          </a>
        </template>
        <template #items-4>
          <a href="https://codepen.io/philippebeck"
            title="Philippe Beck @CodePen">
            <i class="fa-brands fa-codepen fa-2x fa-fw black"></i>
          </a>
        </template>
      </ListElt>
    </template>
  </FootElt>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      userId: null
    }
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.go();
    }
  },

  mounted() {
    if (localStorage.userId) {
      this.userId = JSON.parse(localStorage.userId);
    }
  }
};
</script>
