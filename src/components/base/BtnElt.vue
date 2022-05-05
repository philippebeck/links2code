<template>
  <button 
    v-if="getBtnType() === 'button'"
    :id="id"
    :name="name"
    :title="title"
    :type="type"
    :value="value">
    <slot name="button"></slot>
    {{ content }}
  </button>

  <a 
    v-else
    :href="href"
    :id="id"
    :title="title">
    <slot name="link"></slot>
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
a {
  color: var(--primary);
  text-decoration: none;
}
a:hover,
a:focus {
  color: var(--violet);
}

button {
  background-color: var(--primary);
  color: var(--secondary);
}

button:hover,
button:focus {
  background-color: var(--secondary);
  color: var(--primary);
}

$btn-tn-padding:    3px 6px   !default;
$btn-tn-font-size:  60%       !default;

$btn-sm-padding:    4px 8px   !default;
$btn-sm-font-size:  80%       !default;

$btn-lg-padding:    6px 12px  !default;
$btn-lg-font-size:  120%      !default;

$btn-xl-padding:    7px 14px  !default;
$btn-xl-font-size:  140%      !default;

$btn-wd-padding:    8px 16px  !default;
$btn-wd-font-size:  160%      !default;

$btn-size: 'tn', 'sm', 'lg', 'xl', 'wd';

$btn-sizes: (
  'tn-padding':   $btn-tn-padding,
  'tn-font-size': $btn-tn-font-size,
  'sm-padding':   $btn-sm-padding,
  'sm-font-size': $btn-sm-font-size,
  'lg-padding':   $btn-lg-padding,
  'lg-font-size': $btn-lg-font-size,
  'xl-padding':   $btn-xl-padding,
  'xl-font-size': $btn-xl-font-size,
  'wd-padding':   $btn-wd-padding,
  'wd-font-size': $btn-wd-font-size
) !default;

$btn-square-border-radius:  unset                             !default;
$btn-square-padding-top:    calc(var(--btn-square-sizes) / 4) !default;
$btn-square-sizes:          100px                             !default;

$btn-curve-border-radius: 10px                                !default;
$btn-curve-padding-top:   calc(var(--btn-round-sizes) / 4)    !default;
$btn-curve-sizes:         100px                               !default;

$btn-round-border-radius: 20px                                !default;
$btn-round-padding-top:   calc(var(--btn-round-sizes) / 4)    !default;
$btn-round-sizes:         100px                               !default;

$btn-circle-border-radius:  50%                               !default;
$btn-circle-padding-top:    calc(var(--btn-circle-sizes) / 4) !default;
$btn-circle-sizes:          100px                             !default;

$btn-shape: 'square', 'round', 'circle';

$btn-shapes: (
  'square-border-radius': $btn-square-border-radius,
  'square-padding-top':   $btn-square-padding-top,
  'square-sizes':         $btn-square-sizes,
  'curve-border-radius':  $btn-curve-border-radius,
  'curve-padding-top':    $btn-curve-padding-top,
  'curve-sizes':          $btn-curve-sizes,
  'round-border-radius':  $btn-round-border-radius,
  'round-padding-top':    $btn-round-padding-top,
  'round-sizes':          $btn-round-sizes,
  'circle-border-radius': $btn-circle-border-radius,
  'circle-padding-top':   $btn-circle-padding-top,
  'circle-sizes':         $btn-circle-sizes,
) !default;

a,
button {
  --btn-margin: 10px;
  --btn-padding: 10px;
  --btn-font-size: 2rem;
  --btn-font-weight: bold;
  --btn-text-align: center;

  --btn-hover-border-radius: 5px;
  --btn-hover-transition: all 300ms linear;
  --btn-hover-animation: none;

  --btn-checked-transform: scale(0.9);

  --btn-child-margin: auto;

  @each $key, $value in $btn-sizes {
    --btn-#{$key}: #{$value};
  }

  @each $key, $value in $btn-shapes {
    --btn-#{$key}: #{$value};
  }
}

a {
  --btn-border-style: solid;
  --btn-border-width: medium;
  --btn-border-radius: 10px;
  --btn-border-color: var(--white);
  --btn-background-color: var(--black);
  --btn-color: var(--white);

  --btn-hover-border-style: solid;
  --btn-hover-border-width: medium;
  --btn-hover-box-shadow: inset 0 0 5px 5px;
  --btn-hover-border-color: var(--black);
  --btn-hover-background-color: var(--white);
  --btn-hover-color: var(--black);
}

button {
  --button-border-style: outset;
  --button-border-width: medium;
  --button-border-radius: 5px;
  --button-border-color: var(--black);
  --button-background-color: var(--white);
  --button-color: var(--black);

  --button-hover-border-style: solid;
  --button-hover-border-width: medium;
  --button-hover-box-shadow: inset 0 0 5px 5px;
  --button-hover-border-color: var(--white);
  --button-hover-background-color: var(--black);
  --button-hover-color: var(--white);
}

a,
button {
  display: inline-block;
  margin: var(--btn-margin);
  padding: var(--btn-padding);
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  text-align: var(--btn-text-align);

  & > * {
    display: block;
    margin: var(--btn-child-margin);
  }
}

a {
  border-style: var(--btn-border-style);
  border-width: var(--btn-border-width);
  border-radius: var(--btn-border-radius);
  border-color: var(--btn-border-color);
  background-color: var(--btn-background-color);
  color: var(--btn-color);
}

button {
  border-style: var(--button-border-style);
  border-width: var(--button-border-width);
  border-radius: var(--button-border-radius);
  border-color: var(--button-border-color);
  background-color: var(--button-background-color);
  color: var(--button-color);
}

a:hover,
button:hover,
a:focus,
button:focus,
[class*="btn-check"]:checked + a,
[class*="button-check"]:checked + button {
  border-radius: var(--btn-hover-border-radius);
  transition: var(--btn-hover-transition);
  animation: var(--btn-hover-animation);
}

a:hover,
a:focus,
[class*="btn-check"]:checked + a {
  border-style: var(--btn-hover-border-style);
  border-width: var(--btn-hover-border-width);
  box-shadow: var(--btn-hover-box-shadow);
  border-color: var(--btn-hover-border-color);
  background-color: var(--btn-hover-background-color);
  color: var(--btn-hover-color);
}

button:hover,
button:focus,
[class*="button-check"]:checked + button {
  border-style: var(--button-hover-border-style);
  border-width: var(--button-hover-border-width);
  box-shadow: var(--button-hover-box-shadow);
  border-color: var(--button-hover-border-color);
  background-color: var(--button-hover-background-color);
  color: var(--button-hover-color);
}

[class*="check"]:checked + a,
[class*="check"]:checked + button {
  transform: var(--btn-checked-transform);
}

@mixin btn-color($key, $value) {
  .btn-#{$key},
  .button-#{$key}:hover,
  .button-#{$key}:focus,
  .button-#{$key}-check:checked + .button-#{$key} {
    border-color: var(--white);
    background-color: var(--#{$key});
    color: var(--white);
  }

  .button-#{$key},
  .btn-#{$key}:hover,
  .btn-#{$key}:focus,
  .btn-#{$key}-check:checked + .btn-#{$key} {
    border-color: var(--#{$key});
    background-color: var(--white);
    color: var(--#{$key});
  }
}

@each $colors in $main-colors {
  @each $key, $value in $colors {
    @include btn-color($key, $value);
  }
}

@each $size in $btn-size {
  .btn-#{$size},
  .button-#{$size} {
    padding: var(--btn-#{$size}-padding);
    font-size: var(--btn-#{$size}-font-size);
  }
}

@each $shape in $btn-shape {
  .btn-#{$shape},
  .button-#{$shape} {
    border-radius: var(--btn-#{$shape}-border-radius);
    padding-top: var(--btn-#{$shape}-padding-top);
    min-width: var(--btn-#{$shape}-sizes);
    min-height: var(--btn-#{$shape}-sizes);
  }

  .btn-#{$shape}:hover,
  .button-#{$shape}:hover,
  .btn-#{$shape}:focus,
  .button-#{$shape}:focus {
    border-radius: var(--btn-#{$shape}-border-radius);
  }
}
</style>
