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

<style scoped>
a,
button {
  --btn-display: inline-block;
  --btn-margin: 10px;
  --btn-border: solid 2px var(--white);
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
}

a:hover,
a:focus,
button:hover,
button:focus {
  --btn-hover-border-color: var(--black);
  --btn-hover-border-radius: 5px;
  --btn-hover-background-color: var(--white);
  --btn-hover-color: var(--black);
  --btn-hover-box-shadow: inset 0 0 5px 2px;
  --btn-hover-transition: all 200ms;

  border-color: var(--btn-hover-border);
  border-radius: var(--btn-hover-border-radius);
  background-color: var(--btn-hover-background-color);
  color: var(--btn-hover-color);
  box-shadow: var(--btn-hover-box-shadow);
  transition: var(--btn-hover-transition);
}

a > *,
button > * {
  --btn-child-display: block;
  --btn-child-margin: auto;

  display: var(--btn-child-display);
  margin: var(--btn-child-margin);
}

/* RED */

.btn-red {
  background-color: var(--red);
}

.btn-red:hover,
.btn-red:focus {
  border-color: var(--red);
  color: var(--red);
}

/* ORANGE */

.btn-orange {
  background-color: var(--orange);
}

.btn-orange:hover,
.btn-orange:focus {
  border-color: var(--orange);
  color: var(--orange);
}

/* YELLOW */

.btn-yellow {
  background-color: var(--yellow);
}

.btn-yellow:hover,
.btn-yellow:focus {
  border-color: var(--yellow);
  color: var(--yellow);
}

/* GREEN */

.btn-green {
  background-color: var(--green);
}

.btn-green:hover,
.btn-green:focus {
  border-color: var(--green);
  color: var(--green);
}

/* SKY */

.btn-sky {
  background-color: var(--sky);
}

.btn-sky:hover,
.btn-sky:focus {
  border-color: var(--sky);
  color: var(--sky);
}

/* BLUE */

.btn-blue {
  background-color: var(--blue);
}

.btn-blue:hover,
.btn-blue:focus {
  border-color: var(--blue);
  color: var(--blue);
}

/* VIOLET */

.btn-violet {
  background-color: var(--violet);
}

.btn-violet:hover,
.btn-violet:focus {
  border-color: var(--violet);
  color: var(--violet);
}

/* PINK */

.btn-pink {
  background-color: var(--pink);
}

.btn-pink:hover,
.btn-pink:focus {
  border-color: var(--pink);
  color: var(--pink);
}
</style>
