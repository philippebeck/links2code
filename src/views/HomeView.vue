<template>
  <main id="links" class="container-80tn-70md-60xl">

    <nav class="sidebar">
      <a
        v-for="(cat, index) in cats"
        :key="index"
        :href="`#${cat}`"
        :title="cat">
        <i :class="`fa-brands fa-${cat.toLowerCase()} fa-fw`"></i>
      </a>
      <a
        href="#links"
        title="Haut de page">
        <i class="fas fa-chevron-circle-up fa-fw"></i>
      </a>
    </nav>

    <header>
      <i class="blue fa-solid fa-link fa-2x"></i>
      <h1 class="blue shatex-blur-sm anima-slideB">
        Links2Code
      </h1>
      <strong class="gray">
        Des Liens pour Coder !
      </strong>
    </header>

    <ListElt :items="itemsByCat(links)">
      <template #items="slotProps">
        <i 
          :class="`fa-brands fa-${slotProps.index.toLowerCase()} fa-6x sky shatex-blur-md anima-grow mar-lg`"
          :id="slotProps.index">
        </i>
      </template>

      <template #nested="slotProps">
        <BtnElt
          :content="slotProps.value.name"
          :href="`https://${slotProps.value.url}`" 
          :title="slotProps.value.url"
          class="blue"/>
      </template>
    </ListElt>

  </main>
</template>

<script>
import BtnElt from "@/components/base/BtnElt"
import ListElt from "@/components/data/ListElt"

export default {
  name: "HomeView",
  components: {
    BtnElt,
    ListElt
  },

  data() {
    return {
      links: []
    }
  },

  computed: {
    cats() {
      const cats = new Set();
      this.links.forEach(link => cats.add(link.cat));
      return Array.from(cats); 
    }
  },

  methods: {
    itemsByCat(items) {
      const itemsByCat = {};

      items.forEach(item => {
        if (!itemsByCat[item.cat]) {
          itemsByCat[item.cat] = [];
        }
        itemsByCat[item.cat].push(item);
        itemsByCat[item.cat].sort((a, b) => (a.name > b.name) ? 1 : -1);
      });

      return itemsByCat;
    },
  },
  
  mounted () {
    this.$serve.getData("/api/links")
      .then(response => {
        this.links = response;
      })
  }
}
</script>
