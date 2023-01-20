<template>
  <nav
    v-if="getNavClass() === 'sidebar'" 
    class="sidebar">

    <slot name="first"></slot>

    <a 
      v-for="(item, index) in items"
      :key="index"
      :href="`#${item}`"
      :title="item">
      <slot 
        name="items"
        :item="item"
        :index="index">
      </slot>
    </a>

    <slot name="last"></slot>

    <a
      v-if="hasSlot('top')"
      href="#top"
      title="Top of the Page">
      <slot name="top"></slot>
    </a>
  </nav>
  
  <nav 
    v-else 
    class="navbar">

    <a 
      v-if="hasSlot('brand')"
      href="/"
      title="Home">
      <slot name="brand"></slot>
    </a>

    <slot name="nav"></slot>

    <slot name="admin"></slot>

    <button
      v-if="hasSlot('switch')"
      type="button">
      <slot name="switch"></slot>
    </button>
  </nav>
</template>

<script>
export default {
  name: "NavElt",

  props: {
    class: {
      type: String,
      default: "navbar"
    },
    items: {
      type: Array
    }
  },

  methods: {
    getNavClass() {
      if (this.class === "sidebar") {
        return "sidebar";
      }
      return "navbar";
    },

    hasSlot(name) {
      return this.$slots[name] !== undefined;
    }
  }
}
</script>

<style>
:root {
  --navbar-height: 80px;
}

[id="app"] {
  margin-top: calc(var(--navbar-height) + 20px);
}
</style>

<style scoped>
.sidebar {
  --sidebar-display: flex;
  --sidebar-flex-flow: column;
  --sidebar-position: fixed;
  --sidebar-top: calc(var(--navbar-height) + 10px);
  --sidebar-left: 2px;
  --sidebar-z-index: 10;
  --sidebar-width: auto;

  display: var(--sidebar-display);
  flex-flow: var(--sidebar-flex-flow);
  position: var(--sidebar-position);
  top: var(--sidebar-top);
  left: var(--sidebar-left);
  z-index: var(--sidebar-z-index);
  width: var(--sidebar-width);
}
.sidebar > :deep(a) {
  --sidebar-a-display: flex;
  --sidebar-a-place-content: center;
  --sidebar-a-place-items: center;
  --sidebar-a-margin: 5px;
  --sidebar-a-border-radius: 20px;
  --sidebar-a-padding: 5px;
  --sidebar-a-width: 100%;
  --sidebar-a-background-color: var(--white-dark);
  --sidebar-a-color: var(--blue-dark);
  --sidebar-a-cursor: crosshair;

  display: var(--sidebar-a-display);
  place-content: var(--sidebar-a-place-content);
  place-items: var(--sidebar-a-place-items);
  margin: var(--sidebar-a-margin);
  border-radius: var(--sidebar-a-border-radius);
  padding: var(--sidebar-a-padding);
  width: var(--sidebar-a-width);
  background-color: var(--sidebar-a-background-color);
  color: var(--sidebar-a-color);
  cursor: var(--sidebar-a-cursor);
}

.sidebar > :deep(a:hover),
.sidebar > :deep(a:focus) {
  --sidebar-a-hover-border-radius: 10px;
  --sidebar-a-hover-background-color: var(--blue-dark);
  --sidebar-a-hover-color: var(--white-dark);
  --sidebar-a-hover-transform: scale(1.1);
  --sidebar-a-hover-transition: all 500ms;

  border-radius: var(--sidebar-a-hover-border-radius);
  color: var(--sidebar-a-hover-color);
  background-color: var(--sidebar-a-hover-background-color);
  transform: var(--sidebar-a-hover-transform);
  transition: var(--sidebar-a-hover-transition);
}

.navbar {
  --navbar-place-content: space-between;
  --navbar-place-items: center;
  --navbar-position: fixed;
  --navbar-top: 0;
  --navbar-right: 0;
  --navbar-bottom: unset;
  --navbar-left: 0;
  --navbar-z-index: 1000;
  --navbar-background-color: var(--blue-dark);
  --navbar-color: var(--white);

  place-content: var(--navbar-place-content);
  place-items: var(--navbar-place-items);
  position: var(--navbar-position);
  top: var(--navbar-top);
  right: var(--navbar-right);
  bottom: var(--navbar-bottom);
  left: var(--navbar-left);
  z-index: var(--navbar-z-index);
  height: var(--navbar-height);
  background-color: var(--navbar-background-color);
  color: var(--navbar-color);
}

.navbar,
.navbar > :deep(ul):first-of-type a,
.navbar > :deep(ul):last-of-type a {
  display: flex;
}

.navbar :deep(a),
.navbar :deep(button) {
  --navbar-link-padding: 20px 10px;
  --navbar-link-color: var(--white);
  --navbar-link-cursor: pointer;

  padding: var(--navbar-link-padding);
  color: var(--navbar-link-color);
  cursor: var(--navbar-link-cursor);
}

.navbar :deep(i) {
  --navbar-icon-place-self: center;
  place-self: var(--navbar-icon-place-self);
}

.navbar > :deep(ul) {
  --navbar-list-place-items: center;
  --navbar-list-margin: 0;
  --navbar-list-padding: 0;
  --navbar-list-list-style: none;

  display: flex !important;
  place-items: var(--navbar-list-place-items);
  margin: var(--navbar-list-margin);
  padding: var(--navbar-list-padding);
  list-style: var(--navbar-list-list-style);
}

.navbar > :deep(ul) a,
.navbar > :deep(ul) button {
  --navbar-list-link-flex-direction: column;
  flex-direction: var(--navbar-list-link-flex-direction);
}

.navbar > :deep(ul):first-of-type a:hover,
.navbar > :deep(ul):first-of-type a:focus,
.navbar > :deep(ul):first-of-type button:hover,
.navbar > :deep(ul):first-of-type button:focus {
  --navbar-first-list-link-hover-color: var(--yellow);
  --navbar-first-list-link-hover-scale: 0.9;

  color: var(--navbar-first-list-link-hover-color);
  transform: scale(var(--navbar-first-list-link-hover-scale));
}

.navbar > :deep(ul):last-of-type a:hover,
.navbar > :deep(ul):last-of-type a:focus,
.navbar > :deep(ul):last-of-type button:hover,
.navbar > :deep(ul):last-of-type button:focus {
  --navbar-last-list-link-hover-color: var(--orange);
  --navbar-last-list-link-hover-scale: 1.5;

  color: var(--navbar-last-list-link-hover-color);
  transform: scale(var(--navbar-last-list-link-hover-scale));
}

.navbar :deep(button) {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

@media (min-width: 576px) {
  .navbar {
    --navbar-flex-direction: row;
    --navbar-place-content: space-around;
    --navbar-padding: 10px;
  }
}
</style>
