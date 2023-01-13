<template>
  <footer>
    <ul>
      <li>
        <section>
          <h3>{{ title1 }}</h3>
          <slot name="foot1"></slot>
        </section>
      </li>
      <li v-if="hasSlot('foot2')">
        <section>
          <h3>{{ title2 }}</h3>
          <slot name="foot2"></slot>
        </section>
      </li>
      <li v-if="hasSlot('foot3')">
        <section>
          <h3>{{ title3 }}</h3>
          <slot name="foot3"></slot>
        </section>
      </li>
    </ul>
    <aside v-if="hasSlot('foot')">
      <slot name="foot"></slot>
    </aside>
  </footer>
</template>

<script>
export default {
  name: "FootElt",
  props: {
    title1: {
      type: String,
      default: "Sites"
    },
    title2: {
      type: String,
      default: "Links"
    },
    title3: {
      type: String,
      default: "Tools"
    }
  },
  methods: {
    hasSlot(name) {
      return this.$slots[name] !== undefined;
    }
  }
}
</script>

<style scoped>
footer {
  margin-top: 20px;
  text-align: center;
}

h3,
:deep(ul) {
  margin: 0;
  padding: 0;
}

:deep(li) {
  list-style-type: none;
}

:deep(a) {
  text-decoration: none;
}

/********************* MAIN PART *********************/

footer > ul { 
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 20px;
  padding: 20px;
  background-color: var(--sky);
}

h3 {
  margin-bottom: 5px;
  font-size: 1.5rem;
  font-family: monospace;
  color: var(--yellow);
}

section :deep(a) {
  color: var(--white);
}

section :deep(a):hover,
section :deep(a):focus {
  color: var(--gray);
}

/********************* SECOND PART *********************/

aside > :deep(ul) {
  display: flex;
  flex-direction: row;
  place-content: center;
  gap: 10px;
  padding: 10px;
  background-color: var(--white);
}

aside :deep(a) {
  color: var(--blue);
}

/********************* RESPONSIVE *********************/

@media (min-width: 576px) {
  footer > ul {
    flex-direction: row;
    place-content: space-around;
  }
}

@media (min-width: 768px) {
  footer > ul {
    place-content: space-evenly;
  }
}

@media (min-width: 992px) {
  footer > ul {
    place-content: center;
    gap: 10%;
  }
}
</style>
