<template>
  <footer>
    <ol>
      <li v-if="hasSlot('one')">
        <h3>{{ title1 }}</h3>
        <slot name="one"></slot>
      </li>

      <li v-if="hasSlot('two')">
        <h3>{{ title2 }}</h3>
        <slot name="two"></slot>
      </li>

      <li v-if="hasSlot('three')">
        <h3>{{ title3 }}</h3>
        <slot name="three"></slot>
      </li>
    </ol>

    <slot name="main"></slot>
  </footer>
</template>

<script>
export default {
  name: "FootElt",
  props: {
    title1: {
      type: String,
      default: "Tools"
    },
    title2: {
      type: String,
      default: "Sites"
    },
    title3: {
      type: String,
      default: "Apps"
    }
  },
  methods: {
    hasSlot(name) {
      return this.$slots[name] !== undefined;
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  text-align: center;
}

ol {
  display: flex;
  flex-direction: column;
  place-content: space-evenly;
  padding: 10px 0;
  background-color: var(--primary);

  li {
    list-style-type: none;
  }

  :slotted(a) {
    font-size: 1.5rem;
    color: var(--white);

    &:hover,
    &:focus {
      color: var(--secondary);
    }
  }
}

h3 {
  margin: 0;
  font-size: 2rem;
  color: var(--grey);
}

footer > :deep(ul) {
  display: flex;
  flex-direction: row;
  place-content: center;
}

@media screen and (min-width: 768px) {
  ol {
    flex-direction: row;
  }
}
</style>
