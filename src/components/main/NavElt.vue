<template>
  <nav class="navbar">
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
  name: "NavElt"
}
</script>

<style lang="scss">
:root {
  --navbar-height: 80px;
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
  --navbar-background-color: var(--primary-dark);
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
  --navbar-link-hover-color: var(--secondary);
  --navbar-first-list-link-hover-scale: 0.9;
  --navbar-last-list-img-margin: 5px;
  --navbar-last-list-height: 50px;
  --navbar-last-list-link-hover-scale: 1.5;
  --navbar-brand-link-left: 0;
  --navbar-brand-link-img-height: 40px;
  --navbar-label-right: 10px;
  --navbar-label-hover-color: var(--secondary);
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

.sidebar {
  --sidebar-flex-direction: column;
  --sidebar-position: fixed;
  --sidebar-top: calc(var(--navbar-height) + 10px);
  --sidebar-left: 2px;
  --sidebar-z-index: 10;
  --sidebar-width: auto;
  --sidebar-child-place-content: center;
  --sidebar-child-place-items: center;
  --sidebar-child-margin: 5px;
  --sidebar-child-border-radius: 20px;
  --sidebar-child-padding: 10px;
  --sidebar-child-width: 100%;
  --sidebar-child-background-color: var(--white-dark);
  --sidebar-child-color: var(--primary-dark);
  --sidebar-child-cursor: crosshair;
  --sidebar-child-hover-border-radius: 10px;
  --sidebar-child-hover-background-color: var(--primary-dark);
  --sidebar-child-hover-color: var(--white-dark);
  --sidebar-child-hover-transform: scale(1.1);
  --sidebar-child-hover-transition: all 1s;
  --sidebar-checked-child-font-weight: bold;
  --sidebar-checked-child-background-color: var(--primary);
  --sidebar-checked-child-color: var(--white);

  display: flex;
  flex-direction: var(--sidebar-flex-direction);
  position: var(--sidebar-position);
  top: var(--sidebar-top);
  left: var(--sidebar-left);
  z-index: var(--sidebar-z-index);
  width: var(--sidebar-width);

  & > * {
    display: flex;
    place-content: var(--sidebar-child-place-content);
    place-items: var(--sidebar-child-place-items);
    margin: var(--sidebar-child-margin);
    border-radius: var(--sidebar-child-border-radius);
    padding: var(--sidebar-child-padding);
    width: var(--sidebar-child-width);
    background-color: var(--sidebar-child-background-color);
    color: var(--sidebar-child-color);
    cursor: var(--sidebar-child-cursor);

    &:hover,
    &:focus {
      border-radius: var(--sidebar-child-hover-border-radius);
      color: var(--sidebar-child-hover-color);
      background-color: var(--sidebar-child-hover-background-color);
      transform: var(--sidebar-child-hover-transform);
      transition: var(--sidebar-child-hover-transition);
    }
  }
}

.sidebar-open,
.sidebar-check:checked ~ * {
  display: none;
}

.sidebar-check:checked ~ .sidebar-open {
  display: flex;
}

.sidebar-relay {
  & > * {
    display: none;
  }

  & > h2,
  & > h3,
  & > h4,
  & > h5,
  & > h6 {
    display: block;
  }
}

.sidebar-radio1:checked ~ .sidebar [for*="sidebar-"][for*="-radio1"],
.sidebar-radio2:checked ~ .sidebar [for*="sidebar-"][for*="-radio2"],
.sidebar-radio3:checked ~ .sidebar [for*="sidebar-"][for*="-radio3"],
.sidebar-radio4:checked ~ .sidebar [for*="sidebar-"][for*="-radio4"],
.sidebar-radio5:checked ~ .sidebar [for*="sidebar-"][for*="-radio5"],
.sidebar-radio6:checked ~ .sidebar [for*="sidebar-"][for*="-radio6"],
.sidebar-radio7:checked ~ .sidebar [for*="sidebar-"][for*="-radio7"],
.sidebar-radio8:checked ~ .sidebar [for*="sidebar-"][for*="-radio8"],
.sidebar-radio9:checked ~ .sidebar [for*="sidebar-"][for*="-radio9"] {
  font-weight: var(--sidebar-checked-child-font-weight);
  background-color: var(--sidebar-checked-child-background-color);
  color: var(--sidebar-checked-child-color);

  &:hover {
    background-color: var(--sidebar-child-hover-background-color);
  }
}

.sidebar-radio1:checked ~ .sidebar-relay .sidebar-target1,
.sidebar-radio2:checked ~ .sidebar-relay .sidebar-target2,
.sidebar-radio3:checked ~ .sidebar-relay .sidebar-target3,
.sidebar-radio4:checked ~ .sidebar-relay .sidebar-target4,
.sidebar-radio5:checked ~ .sidebar-relay .sidebar-target5,
.sidebar-radio6:checked ~ .sidebar-relay .sidebar-target6,
.sidebar-radio7:checked ~ .sidebar-relay .sidebar-target7,
.sidebar-radio8:checked ~ .sidebar-relay .sidebar-target8,
.sidebar-radio9:checked ~ .sidebar-relay .sidebar-target9 {
  display: block;
}
</style>
