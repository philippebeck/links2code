<template>
  <main class="container-80tn-70md-60xl">

    <CardElt>
      <template #header>
        <i class="blue fa-solid fa-link fa-2x"></i>
        <h1 class="blue shatex-blur-sm anima-slideB">
          Links2Code
        </h1>
        <strong class="gray">
          Links for Coding !
        </strong>

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
            title="Top of page">
            <i class="fas fa-chevron-circle-up fa-fw"></i>
          </a>
        </nav>
      </template>

      <template #body>
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
      </template>
    </CardElt>
  </main>
</template>

<script>
import CardElt from "@/components/main/CardElt"
import BtnElt from "@/components/base/BtnElt"
import ListElt from "@/components/data/ListElt"

export default {
  name: "HomeView",
  components: {
    CardElt,
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
    /**
     * RETURN AN ARRAY OF ITEMS BY CATEGORY
     * @param {object} items 
     */
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
