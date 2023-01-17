<template>
  <figure :title="title">
    <picture v-if="items">
      <source 
        v-for="(item, index) in items"
        :key="index"
        :srcset="item.srcset"
        :media="item.media">
      <img 
        :src="src"
        :alt="alt">
    </picture>
    <img
      v-else
      :src="src"
      :alt="alt">
    <figcaption>
      <slot name="figcaption"></slot>
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: "ImgElt",

  props: {
    items: {
      type: Array
    },
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
  }
}
</script>

<style scoped>
figure {
  --figure-border: 1px solid transparent;
  --figure-border-radius: 10%;
  --figure-background-color: transparent;

  border: var(--figure-border);
  border-radius: var(--figure-border-radius);
  background-color: var(--figure-background-color);
}

img {
  --img-border: 1px solid var(--blue);
  --img-border-radius: 50%;
  --img-max-width: 100%;
  --img-height: auto;
  --img-object-fit: contain;
  --img-object-position: 50% 50%;

  border: var(--img-border);
  border-radius: var(--img-border-radius);
  max-width: var(--img-max-width);
  height: var(--img-height);
  object-fit: var(--img-object-fit);
  object-position: var(--img-object-position);
}

figcaption {
  --figcaption-display: flex;
  --figcaption-flex-flow: column nowrap;
  --figcaption-place-content: center center;
  --figcaption-color: var(--blue);

  display: var(--figcaption-display);
  flex-flow: var(--figcaption-flex-flow);
  place-content: var(--figcaption-place-content);
  color: var(--figcaption-color);
}
</style>
