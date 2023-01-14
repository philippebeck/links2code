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

        } else {
          return "link";
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
a,
button {
  display: inline-block;
  margin: 10px;
  border: solid 2px var(--black);
  border-radius: 10px;
  padding: 5px 10px;
  font-family: var(--monospace);
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: var(--black);
  color: var(--white);
  cursor: pointer;

  &:hover,
  &:focus {
    border-radius: 5px;
    background-color: var(--white);
    color: var(--black);
    box-shadow: inset 0 0 5px 2px;
    transition: all 200ms;
  }

  & > * {
    display: block;
    margin: auto;
  }
}

$colors:
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "aqua",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "magenta",
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
    transition: all 1s;
  }
}

@each $key, $value in $colors {
    @include colors($key);
  }
</style>
