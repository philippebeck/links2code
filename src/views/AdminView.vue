<template>
  <main id="admin">

    <nav class="sidebar">
      <input 
        id="sidebar-class"
        class="sidebar-check" 
        type="checkbox">
      <label 
        for="sidebar-class"
        class="sidebar-open" 
        title="Afficher">
        <i class="far fa-eye fa-fw"></i>
      </label>
      <label 
        for="sidebar-class"
        title="Cacher">
        <i class="far fa-eye-slash fa-fw color-violet"></i>
      </label>
      <a 
        href="#link" 
        title="Créer un lien">
        <i class="fas fa-link fa-fw color-violet"></i>
      </a>

      <a 
        v-for="(cat, index) in cats" 
        :key="index"
        :href="`#${cat}`" 
        :title="`Gérer les liens ${cat}`">
        <i :class="`fa-brands fa-${cat} fa-fw color-violet`"></i>
      </a>
      
      <a 
        href="#user" 
        title="Créer un utilisateur">
        <i class="fas fa-user fa-fw color-violet"></i>
      </a>
      <a 
        href="#users" 
        title="Gérer les utilisateurs">
        <i class="fas fa-users fa-fw color-violet"></i>
      </a>
      <a 
        href="#admin" 
        title="Haut de page">
        <i class="fas fa-chevron-circle-up fa-fw color-violet"></i>
      </a>
    </nav>

    <h1 class="violet anima-slideB">
      <i class="fa-solid fa-cogs fa-2x"></i>
      Admin
    </h1>

    <section>
      <h2 id="link">
        <i class="fa-solid fa-link fa-2x"></i>
        Liens
      </h2>

      <CreateLink />

      <ListLinks 
        v-if="links.length > 0" 
        :links="links"/>
    </section>

    <section>
      <h2 id="user">
        <i class="fa-solid fa-users fa-2x"></i>
        Utilisateurs
      </h2>

      <CreateUser />

      <ListUsers 
        v-if="users.length > 0" 
        :users="users"/>
    </section>

  </main>
</template>

<script>
import { getData } from "@/script/services";

import CreateLink from "@/views/admin/CreateLink.vue";
import CreateUser from "@/views/admin/CreateUser.vue";
import ListLinks from "@/views/admin/ListLinks.vue";
import ListUsers from "@/views/admin/ListUsers.vue";

export default {
  name: "AdminView",
  components: {
    CreateLink,
    CreateUser,
    ListLinks,
    ListUsers
  },

  data() {
    return {
      links: [],
      users: []
    }
  },
  computed: {
    cats() {
      const cats = new Set();
      this.links.forEach(link => cats.add(link.cat));

      return Array.from(cats); 
    }
  },
  beforeMount () {
    if (localStorage.userId) {

      getData("/api/links")
        .then(res => { this.links = res;})
        .catch(err => { console.log(err); });

      getData("/api/users")
        .then(res => { this.users = res; })
        .catch(err => { console.log(err); });

    } else {
      alert("Go back Home !");
      this.$router.push("/");
    }
  }
}
</script>
