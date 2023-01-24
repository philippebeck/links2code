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

    <ul 
      id="nav"
      class="show">
      <li 
        v-for="(item, index) in items"
        :key="index">
        <a
          :href="'/' + item"
          :title="item.charAt(0).toUpperCase() + item.slice(1)">

          <slot 
            :name="item"
            :item="item"
            :index="index">
          </slot>

          <b>{{ item.charAt(0).toUpperCase() + item.slice(1) }}</b>
        </a>
      </li>
    </ul>

    <aside 
      v-if="hasSlot('admin')"
      id="admin"
      class="hide">
      <slot name="admin"></slot>
    </aside>
    
    <button
      type="button"
      @click="toggleMenu()"
      title="Menu">
      <i class="fa-solid fa-bars"></i>
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
    },

    toggleMenu() {
      const nav = document.getElementById("nav");
      const admin = document.getElementById("admin");

      nav.classList.toggle("show");
      nav.classList.toggle("hide");

      admin.classList.toggle("show");
      admin.classList.toggle("hide");
    }
  }
}
</script>

<style>
:root {
  --navbar-height: 50px;
}

[id="app"] {
  margin-top: calc(var(--navbar-height) + 20px);
}

@media (min-width: 768px) {
  :root {
    --navbar-height: 80px;
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
.sidebar :deep(a) {
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

.sidebar :deep(a:hover),
.sidebar :deep(a:focus) {
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
  --navbar-display: flex;
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

  display: var(--navbar-display);
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

.navbar :deep(a),
.navbar :deep(button) {
  --navbar-a-padding: 10px;
  --navbar-a-color: var(--white);
  --navbar-a-cursor: pointer;

  padding: var(--navbar-a-padding);
  color: var(--navbar-a-color);
  cursor: var(--navbar-a-cursor);
}

.navbar :deep(ul) {
  --navbar-ul-display: flex;
  --navbar-ul-place-items: center;
  --navbar-ul-margin: 0;
  --navbar-ul-padding: 0;
  --navbar-ul-list-style: none;

  display: var(--navbar-ul-display);
  place-items: var(--navbar-ul-place-items);
  margin: var(--navbar-ul-margin);
  padding: var(--navbar-ul-padding);
  list-style: var(--navbar-ul-list-style);
}

.navbar ul a {
  --navbar-ul-a-display: flex;
  display: var(--navbar-ul-a-display);
}

.navbar ul a :not(i) {
  --navbar-ul-a-not-i-display: none;
  display: var(--navbar-ul-a-not-i-display);
}

.navbar :deep(ul) a,
.navbar :deep(ul) button {
  --navbar-ul-a-flex-direction: column;
  flex-direction: var(--navbar-ul-a-flex-direction);
}

.navbar ul a:hover,
.navbar ul a:focus,
.navbar ul button:hover,
.navbar ul button:focus {
  --navbar-first-ul-a-hover-color: var(--yellow);
  --navbar-first-ul-a-hover-transform: scale(0.9);

  color: var(--navbar-first-ul-a-hover-color) !important;
  transform: var(--navbar-first-ul-a-hover-transform) !important;
}

.navbar :deep(ul):last-of-type a:hover,
.navbar :deep(ul):last-of-type a:focus,
.navbar :deep(ul):last-of-type button:hover,
.navbar :deep(ul):last-of-type button:focus {
  --navbar-last-ul-a-hover-color: var(--orange);
  color: var(--navbar-last-ul-a-hover-color);
}

.navbar :deep(button) {
  --navbar-button-background-color: transparent;
  --navbar-button-border: none;
  --navbar-button-cursor: pointer;

  background-color: var(--navbar-button-background-color);
  border: var(--navbar-button-border);
  cursor: var(--navbar-button-cursor);
}

.navbar :deep(i) {
  --navbar-i-place-self: center;
  place-self: var(--navbar-i-place-self);
}

.hide {
  --hide-display: none;
  display: var(--hide-display) !important;
}

.show {
  --show-display: flex;
  display: var(--show-display);
}

@media (min-width: 576px) {
  .navbar {
    --navbar-place-content: space-around;
  }
}

@media (min-width: 768px) {
  .navbar > button {
    --navbar-button-display: none;
    display: var(--navbar-button-display);
  }

  .navbar ul a :not(i) {
    --navbar-ul-a-not-i-display: flex;
  }

  .hide {
    --hide-display: flex;
  }
}
</style>
