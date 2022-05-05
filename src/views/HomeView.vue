<template>
  <main id="links">

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
        <i class="far fa-eye-slash fa-fw violet"></i>
      </label>
      <a 
        v-for="(cat, index) in cats" 
        :key="index"
        :href="`#${cat}`" 
        :title="cat">
        <i :class="`fa-brands fa-${cat} fa-fw violet`"></i>
      </a>
      <a 
        href="#links" 
        title="Haut de page">
        <i class="fas fa-chevron-circle-up fa-fw violet"></i>
      </a>
    </nav>

    <header>
      <h1 class="violet shatex-blur-sm anima-slideB">
      <i class="fa-solid fa-link fa-2x"></i>
        Links2Code
      </h1>
      <strong class="gray">
        Des Liens pour Coder !
      </strong>
    </header>

    <ListElt :items="itemsByCat(links)">
      <template #items="slotProps">
        <i 
          :class="`fa-brands fa-${slotProps.index} fa-6x primary shatex-blur-md anima-grow`"
          :id="slotProps.index">
          </i>
      </template>

      <template #nested="slotProps">
        <BtnElt
          :content="slotProps.value.name"
          :href="`https://${slotProps.value.url}`" 
          :title="slotProps.value.url"
          class="button-primary"/>
      </template>
    </ListElt>

  </main>
</template>

<script>
import BtnElt from '@/components/base/BtnElt';
import ListElt from "@/components/data/ListElt";
import { getData } from "@/script/services";

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
    getData("/api/links").then(
      response => {
        this.links = response;
      }
    )
  }
}
</script>
