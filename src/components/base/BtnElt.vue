<template>
  <button 
    v-if="getBtnType() === 'button'"
    :id="id"
    :name="name"
    :title="title"
    :type="type"
    :value="value">
    <slot name="btn"></slot>
    {{ content }}
  </button>

  <a 
    v-else
    :href="href"
    :id="id"
    :title="title">
    <slot name="btn"></slot>
    {{ content }}
  </a>
</template>

<script>
  export default {
    name: "BtnElt",

    props: {
      content: {
        type: String,
        default: "",
      },
      href: {
        type: String,
        default: null
      },
      id: {
        type: String,
        default: null
      },
      name: {
        type: String,
        default: null
      },
      title: {
        type: String,
        default: null
      },
      type: {
        type: String,
        default: "link"
      },
      value: {
        type: String,
        default: null
      }
    },

    methods: {
      getBtnType() {
        if (
          this.type === "button" || 
          this.type === "submit" || 
          this.type === "reset") {
          return "button";
        }
        return "link";
      }
    }
  }
</script>

<style lang="scss" scoped>
a,
button {
  --btn-display: inline-block;
  --btn-margin: 10px;
  --btn-border: solid 2px var(--black);
  --btn-border-radius: 10px;
  --btn-padding: 5px 10px;
  --btn-font-family: var(--monospace);
  --btn-font-size: 1.2rem;
  --btn-font-weight: bold;
  --btn-text-align: center;
  --btn-text-decoration: none;
  --btn-background-color: var(--black);
  --btn-color: var(--white);
  --btn-cursor: pointer;

  display: var(--btn-display);
  margin: var(--btn-margin);
  border: var(--btn-border);
  border-radius: var(--btn-border-radius);
  padding: var(--btn-padding);
  font-family: var(--btn-font-family);
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  text-align: var(--btn-text-align);
  text-decoration: var(--btn-text-decoration);
  background-color: var(--btn-background-color);
  color: var(--btn-color);
  cursor: var(--btn-cursor);

  &:hover,
  &:focus {
    --btn-hover-border-radius: 5px;
    --btn-hover-background-color: var(--white);
    --btn-hover-color: var(--black);
    --btn-hover-box-shadow: inset 0 0 5px 2px;
    --btn-hover-transition: all 200ms;

    border-radius: var(--btn-hover-border-radius);
    background-color: var(--btn-hover-background-color);
    color: var(--btn-hover-color);
    box-shadow: var(--btn-hover-box-shadow);
    transition: var(--btn-hover-transition);
  }

  & > * {
    --btn-child-display: block;
    --btn-child-margin: auto;

    display: var(--btn-child-display);
    margin: var(--btn-child-margin);
  }
}

$colors:
  "red",
  "orange",
  "yellow",
  "green",
  "sky",
  "blue",
  "violet",
  "pink";

@mixin colors($color) {
  .#{$color} {
    border-color: var(--white);
    background-color: var(--#{$color});
    color: var(--white);
  }

  .#{$color}:hover,
  .#{$color}:focus {
    border-color: var(--#{$color});
    background-color: var(--white);
    color: var(--#{$color});
  }
}

@each $key, $value in $colors {
    @include colors($key);
  }
</style>
