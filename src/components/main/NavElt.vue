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
    <input
      id="navbar-close"
      class="navbar-close"
      type="radio"
      name="navbar"
      checked>
    <input
      id="navbar-open"
      class="navbar-open"
      type="radio"
      name="navbar">

    <slot name="brand"></slot>
    <slot name="nav"></slot>
    <slot name="admin"></slot>
    
    <label
      for="navbar-close"
      title="Close the Navigation Menu">
      <i class="fa-solid fa-angle-double-up fa-lg"></i>
    </label>
    <label
      for="navbar-open"
      title="Open the Navigation Menu">
      <i class="fa-solid fa-angle-double-down fa-lg"></i>
    </label>
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

<style lang="scss">
:root {
  --navbar-height: 80px;
}

[id="app"] {
  margin-top: calc(var(--navbar-height) + 20px);
}

.navbar {
  --navbar-place-content: center;
  --navbar-place-items: center;
  --navbar-position: fixed;
  --navbar-top: 0;
  --navbar-right: 0;
  --navbar-bottom: unset;
  --navbar-left: 0;
  --navbar-z-index: 1000;
  --navbar-background-color: var(--blue-dark);
  --navbar-color: var(--white);
  --navbar-link-padding: 20px 10px;
  --navbar-link-color: var(--white);
  --navbar-link-cursor: pointer;
  --navbar-icon-place-self: center;
  --navbar-list-place-items: center;
  --navbar-list-margin: 0;
  --navbar-list-padding: 0;
  --navbar-list-list-style: none;
  --navbar-list-link-flex-direction: column;
  --navbar-link-hover-color: var(--yellow);
  --navbar-first-list-link-hover-scale: 0.9;
  --navbar-last-list-img-margin: 5px;
  --navbar-last-list-height: 50px;
  --navbar-last-list-link-hover-scale: 1.5;
  --navbar-brand-link-left: 0;
  --navbar-brand-link-img-height: 40px;
  --navbar-label-right: 10px;
  --navbar-label-hover-color: var(--gray);
  --navbar-first-list-span-font-size: 2rem;
  --navbar-first-list-span-text-align: center;

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

  &,
  & > ul:first-of-type a,
  & > ul:first-of-type label,
  & > ul:last-of-type a,
  & > ul:last-of-type label {
    display: flex;
  }

  & > ul:first-of-type span,
  & > ul:last-of-type span {
    display: none;
  }

  a,
  button,
  label {
    padding: var(--navbar-link-padding);
    color: var(--navbar-link-color);
    cursor: var(--navbar-link-cursor);
  }

  i {
    place-self: var(--navbar-icon-place-self);
  }

  & + * {
    margin-top: var(--navbar-height);
  }

  & > ul {
    place-items: var(--navbar-list-place-items);
    margin: var(--navbar-list-margin);
    padding: var(--navbar-list-padding);
    list-style: var(--navbar-list-list-style);

    a,
    button,
    label {
      flex-direction: var(--navbar-list-link-flex-direction);
    }

    &:first-of-type {
      a:hover,
      a:focus,
      button:hover,
      button:focus,
      label:hover,
      label:focus {
        color: var(--navbar-link-hover-color);
        transform: scale(var(--navbar-first-list-link-hover-scale));
      }
    }

    &:last-of-type {
      img,
      svg {
        margin: var(--navbar-last-list-img-margin);
        height: var(--navbar-last-list-height);
      }

      a:hover,
      a:focus,
      button:hover,
      button:focus,
      label:hover,
      label:focus {
        transform: scale(var(--navbar-last-list-link-hover-scale));
      }
    }
  }

  & > input + a:first-of-type,
  & > input + label:first-of-type {
    position: absolute;
    left: var(--navbar-brand-link-left);
  }

  & > a:first-of-type img,
  & > a:first-of-type svg {
    height: var(--navbar-brand-link-img-height);
  }

  & > [for*="navbar"] {
    position: absolute;
    right: var(--navbar-label-right);
    &:hover,
    &:focus {
      color: var(--navbar-label-hover-color);
    }
  }

  &-close:checked ~ ul:first-of-type,
  &-open:checked ~ ul:last-of-type {
    display: flex;
  }

  &-close,
  &-open,
  &-open:checked ~ ul:first-of-type,
  &-close:checked ~ ul:last-of-type,
  &-close:checked ~ [for="navbar-close"],
  &-open:checked ~ [for="navbar-open"] {
    display: none;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
}

@media (min-width: 576px) {
  .navbar {
    --navbar-flex-direction: row;
    --navbar-place-content: space-around;
    --navbar-padding: 10px;
  }
}

@media (min-width: 768px) {
  .navbar {
    --navbar-place-content: space-evenly;
    & > ul {
      display: flex !important;
    }
    & > input + a:first-of-type,
    & > input + label:first-of-type {
      position: static;
    }
    & > [for*="navbar"] {
      display: none;
    }
  }
}

@media (min-width: 992px) {
  .navbar > ul:first-of-type span {
    display: inline;
    font-size: var(--navbar-first-list-span-font-size);
    text-align: var(--navbar-first-list-span-text-align);
  }
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
</style>
