<template>
  <div>
    <NavElt>
      <template #brand>
        <a 
          class="anima-slideB-this" 
          href="/" 
          title="Accueil">
          <img 
            src="logo.svg" 
            alt="Logo Phi" 
            width="30" 
            height="30">
        </a>
      </template>

      <template #nav>
        <ul>
          <li>
            <a 
              href="/">
              <i class="fa-solid fa-link fa-fw"></i>
              <strong>Liens</strong>
            </a>
          </li>
          <li>
            <a 
              href="/contact">
              <i class="fa-brands fa-at fa-fw"></i>
              <strong>Contact</strong>
            </a>
          </li>
        </ul>
      </template>

      <template #admin>
        <ul v-if="!userId">
          <li>
            <a 
              class="onto-color-cyan" 
              href="https://paypal.me/philippebeck" 
              title="Donation">
              <i class="fa-brands fa-paypal fa-lg fa-fw"></i>
            </a>
          </li>
          <li>
            <a 
              class="onto-color-pink" 
              href="https://github.com/sponsors/philippebeck" 
              title="Sponsor">
              <i class="far fa-heart fa-lg fa-fw"></i>
            </a>
          </li>
          <li>
            <a 
              class="onto-color-red" 
              href="/login" 
              title="Login">
              <i class="fa-solid fa-sign-in-alt fa-lg fa-fw"></i>
            </a>
          </li>
        </ul>

        <ul v-else>
          <li>
            <a 
              class="onto-color-red" 
              href="/admin" 
              title="Admin">
              <i class="fa-solid fa-user-ninja fa-lg fa-fw"></i>
            </a>
          </li>
          <li>
            <button 
              class="onto-color-red" 
              type="button"
              @click="logout()"
              title="Logout">
              <i class="fa-solid fa-sign-out-alt fa-lg fa-fw"></i>
            </button>
          </li>
        </ul>
      </template>
    </NavElt>

    <router-view/>

    <FootElt>
      <template #one>
        <ul>
          <li>
            <a 
              href="https://animadio.org"
              title="Animadio CSS Framework">
              Animadio
            </a>
          </li>
          <li>
            <a 
              href="https://links2code.philippebeck.net"
              title="Des Liens pour Coder">
              Links2Code
            </a>
          </li>
          <li>
            <a 
              href="https://pam.philippebeck.net"
              title="PHP Adaptive Microframework">
              Pam
            </a>
          </li>
        </ul>
      </template>

      <template #two>
        <ul>
          <li>
            <a 
              href="https://asperger.philippebeck.net"
              title="Tests pour le Syndrome d'Asperger">
              Asperger
            </a>
          </li>
          <li>
            <a 
              href="https://astronomy.philippebeck.net"
              title="NASA & CDS APIs">
              Astronomy
            </a>
          </li>
          <li>
            <a 
              href="https://philippebeck.net"
              title="Portail">
              Philippe Beck
            </a>
          </li>
        </ul>
      </template>

      <template #main>
        <ul>
          <li>
            <a 
              class="gh gray-onto"
              href="https://github.com/philippebeck"
              title="Philippe Beck @GitHub">
              <i class="fa-brands fa-github fa-2x fa-fw"></i>
            </a>
          </li>
          <li>
            <a 
              class="tw blue-onto"
              href="https://twitter.com/ph_beck"
              title="Philippe Beck @Twitter">
              <i class="fa-brands fa-twitter fa-2x fa-fw"></i>
            </a>
          </li>
          <li>
            <a 
              class="in blue-onto"
              href="https://www.linkedin.com/in/philippebeck"
              title="Philippe Beck @LinkedIn">
              <i class="fa-brands fa-linkedin-in fa-2x fa-fw"></i>
            </a>
          </li>
          <li>
            <a 
              class="black gray-onto"
              href="https://codepen.io/philippebeck"
              title="Philippe Beck @CodePen">
              <i class="fa-brands fa-codepen fa-2x fa-fw"></i>
            </a>
          </li>
        </ul>
      </template>
    </FootElt>
  </div>
</template>

<script>
import NavElt from "@/components/main/NavElt.vue";
import FootElt from "@/components/main/FootElt.vue";

export default {
  name: 'App',
  components: {
    NavElt,
    FootElt
  },

  data() {
    return {
      userId: null
    }
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    }
  },

  mounted() {
    if (localStorage.userId) {
      this.userId = JSON.parse(localStorage.userId);
    }
  }
};
</script>
