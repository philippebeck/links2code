<template>
  <article v-if="isArticle === true">
    <header>
      <slot name="header"></slot>
    </header>
    <slot name="body"></slot>

    <aside v-if="hasSlot('aside')">
      <slot name="aside"></slot>
    </aside>
    <footer v-if="hasSlot('footer')">
      <slot name="footer"></slot>
    </footer>
  </article>

  <section v-else>
    <header>
      <slot name="header"></slot>
    </header>
    <slot name="body"></slot>

    <aside v-if="hasSlot('aside')">
      <slot name="aside"></slot>
    </aside>
    <footer v-if="hasSlot('footer')">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script>
export default {
  name: "CardElt",
  props: {
    isArticle: {
      type: Boolean,
      default: false
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
article,
section {
  --card-box-sizing: border-box;
  --card-margin: auto;
  --card-border: 1px solid transparent;
  --card-border-radius: 10px;
  --card-padding: 20px;
  --card-width: 90%;
  --card-background-color: transparent;
  --card-color: var(--gray);

  box-sizing: var(--card-box-sizing);
  margin: var(--card-margin);
  border: var(--card-border);
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  width: var(--card-width);
  background-color: var(--card-background-color);
  color: var(--card-color);
}
</style>
