<template>
  <article v-if="article === true">
    <header v-if="hasSlot('head')">
      <slot name="head"></slot>
    </header>

    <slot name="body"></slot>

    <aside v-if="hasSlot('aside')">
      <slot name="aside"></slot>
    </aside>

    <footer v-if="hasSlot('foot')">
      <slot name="foot"></slot>
    </footer>
  </article>

  <section v-else>
    <header v-if="hasSlot('head')">
      <slot name="head"></slot>
    </header>

    <slot name="body"></slot>

    <aside v-if="hasSlot('aside')">
      <slot name="aside"></slot>
    </aside>

    <footer v-if="hasSlot('foot')">
      <slot name="foot"></slot>
    </footer>
  </section>
</template>

<script>
export default {
  name: "CardElt",
  props: {
    article: {
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

<style lang="scss" scoped>
article,
section {
  --card-max-width: 500px;

  display: flex;
  flex-direction: column;
  place-content: space-evenly;
  place-items: center;
  position: relative;
  overflow: hidden;
  margin: 100px auto;
  border: solid medium;
  border-radius: 10px;
  padding: 10px;
  height: initial;
  max-width: var(--card-max-width);
  box-shadow: 3px 5px 10px 5px var(--black);
  background-color: var(--violet-light);
  color: var(--card-black);

  &:hover,
  &:focus {
    transform: rotate(1deg);
    transition: transform 200ms;
  }

  & > * {
    margin: 10px;
    border: solid thin;
    border-radius: 20px;
    padding: 5px 10px;
    max-width: calc(var(--card-max-width) * 0.9);
    background-color: var(--white);
    text-align: center;

    &::selection {
      background-color: var(--black);
      color: var(--green);
    }
  }

  & > *:first-child {
    font-size: 3rem;
    text-shadow: 2px 2px 5px;
  }

  & > [class*="btn"],
  & > [class*="button"] {
    width: calc(var(--card-child-max-width) * 0.5);
    background-color: inherit;
    color: var(--white);
    font-weight: bold;
    text-align: center;

    &:hover,
    &:focus {
      border-color: initial;
      background-color: var(--white);
      color: initial;
    }
  }
}
</style>
