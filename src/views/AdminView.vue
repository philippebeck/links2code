<template>
  <main id="admin" class="container-80tn-70md-60xl">
    <nav class="sidebar">
      <a
        href="#link"
        title="Créer un lien">
        <i class="fas fa-link fa-fw color-violet"></i>
      </a>

      <a
        v-for="(cat, index) in cats"
        :key="index"
        :href="`#${cat}`"
        :title="cat">
        <i :class="`fa-brands fa-${cat.toLowerCase()} fa-fw color-violet`"></i>
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

    <i class="blue fa-solid fa-cogs fa-2x"></i>
    <h1 class="blue anima-slideB">
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
import CreateLink from "@/components/CreateLink"
import CreateUser from "@/components/CreateUser"
import ListLinks from "@/components/ListLinks"
import ListUsers from "@/components/ListUsers"

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

      this.$serve.getData("/api/links")
        .then(res => { this.links = res;})
        .catch(err => { console.log(err); });

      this.$serve.getData("/api/users")
        .then(res => { this.users = res; })
        .catch(err => { console.log(err); });

    } else {
      alert("Go back Home !");
      this.$router.push("/");
    }
  }
}
</script>
