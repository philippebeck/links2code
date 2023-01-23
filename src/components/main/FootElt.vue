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
      default: "Tools"
    },
    title3: {
      type: String,
      default: "Links"
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
  --footer-margin-top: 20px;
  --footer-text-align: center;

  margin-top: var(--footer-margin-top);
  text-align: var(--footer-text-align);
}

h3,
:deep(ul) {
  --footer-child-margin: 0;
  --footer-child-padding: 0;

  margin: var(--footer-child-margin);
  padding: var(--footer-child-padding);
}

:deep(li) {
  --footer-li-list-style: none;
  list-style: var(--footer-li-list-style);
}

:deep(a) {
  --footer-a-text-decoration: none;
  text-decoration: var(--footer-a-text-decoration);
}

/********************* MAIN PART *********************/

footer > ul { 
  --footer-ul-display: flex;
  --footer-ul-flex-direction: column;
  --footer-ul-place-items: center;
  --footer-ul-gap: 20px;
  --footer-ul-padding: 20px;
  --footer-ul-background-color: var(--sky);

  display: var(--footer-ul-display);
  flex-direction: var(--footer-ul-flex-direction);
  place-items: var(--footer-ul-place-items);
  gap: var(--footer-ul-gap);
  padding: var(--footer-ul-padding);
  background-color: var(--footer-ul-background-color);
}

h3 {
  --footer-h3-margin-bottom: 5px;
  --footer-h3-font-size: 2rem;
  --footer-h3-font-family: monospace;
  --footer-h3-color: var(--yellow);

  margin-bottom: var(--footer-h3-margin-bottom);
  font-size: var(--footer-h3-font-size);
  font-family: var(--footer-h3-font-family);
  color: var(--footer-h3-color);
}

section :deep(a) {
  --footer-section-a-color: var(--white);
  color: var(--footer-section-a-color);
}

section :deep(a):hover,
section :deep(a):focus {
  --footer-section-a-hover-color: var(--gray);
  color: var(--footer-section-a-hover-color);
}

/********************* SECOND PART *********************/

aside :deep(ul) {
  --aside-ul-display: flex;
  --aside-ul-flex-direction: row;
  --aside-ul-place-content: center;
  --aside-ul-gap: 10px;
  --aside-ul-padding: 10px;
  --aside-ul-background-color: var(--white);

  display: var(--aside-ul-display);
  flex-direction: var(--aside-ul-flex-direction);
  place-content: var(--aside-ul-place-content);
  gap: var(--aside-ul-gap);
  padding: var(--aside-ul-padding);
  background-color: var(--aside-ul-background-color);
}

aside :deep(a) {
  --aside-a-color: var(--blue);
  color: var(--aside-a-color);
}

aside :deep(i):hover,
aside :deep(i):focus {
  --aside-a-hover-transform: scale(1.2);
  --aside-a-hover-transition: transform 200ms;

  transform: var(--aside-a-hover-transform);
  transition: var(--aside-a-hover-transition);
}

/********************* RESPONSIVE *********************/

@media (min-width: 576px) {
  footer > ul {
    --footer-ul-flex-direction: row;
    --footer-ul-place-content: space-around;

    place-content: var(--footer-ul-place-content);
  }
}

@media (min-width: 768px) {
  footer > ul {
    --footer-ul-place-content: space-evenly;
  }
}

@media (min-width: 992px) {
  footer > ul {
    --footer-ul-place-content: center;
    --footer-ul-gap: 10%;
  }
}
</style>
