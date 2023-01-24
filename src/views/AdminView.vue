<template>
  <CardElt id="top">
    <template #header>
      <i class="blue fa-solid fa-cogs fa-2x"></i>
      <h1 class="blue anima-slideB">
        Admin
      </h1>

      <NavElt
        :items="cats"
        class="sidebar">

        <template #first>
          <a
            href="#link"
            title="Create a link">
            <i class="fas fa-link fa-fw"></i>
          </a>
        </template>

        <template #items="slotProps">
          <i :class="`fa-brands fa-${slotProps.item.toLowerCase()} fa-fw`"></i>
        </template>

        <template #last>
          <a
            href="#user"
            title="Create a user">
            <i class="fas fa-user fa-fw"></i>
          </a>
          <a
            href="#users"
            title="Set users">
            <i class="fas fa-users fa-fw"></i>
          </a>
        </template>

        <template #top>
          <i class="fa-solid fa-chevron-circle-up fa-fw"></i>
        </template>
      </NavElt>
    </template>

    <template #body>
      <CardElt>
        <template #header>
          <i class="fa-solid fa-link fa-2x"></i>
          <h2 id="link">
            Links
          </h2>
        </template>
        
        <template #body>
          <CreateLink />

          <ListLinks
            v-if="links.length > 0"
            :links="links"/>
        </template>
      </CardElt>

      <CardElt>
        <template #header>
          <i class="fa-solid fa-users fa-2x"></i>
          <h2 id="user">
            Users
          </h2>
        </template>

        <template #body>
          <CreateUser />

          <ListUsers
            v-if="users.length > 0"
            :users="users"/>
        </template>
      </CardElt>
    </template>
  </CardElt>
</template>

<script>
import CreateLink from "@/components/CreateLink"
import ListLinks from "@/components/ListLinks"
import CreateUser from "@/components/CreateUser"
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
        .then(res => { this.links = res })
        .catch(err => { console.log(err) });

      this.$serve.getData("/api/users")
        .then(res => { this.users = res })
        .catch(err => { console.log(err) });

    } else {
      alert("Go back Home !");
      this.$router.push("/");
    }
  }
}
</script>
