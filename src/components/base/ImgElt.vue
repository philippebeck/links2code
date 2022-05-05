<template>
  <picture>
    <source 
      :srcset="src" 
      :media="media">
    <img 
      :src="url"
      :alt="info">
  </picture>
</template>

<script>
  export default {
    name: "ImgElt",
    props: {
      url: {
        type: String,
        required: true
      },
      info: {
        type: String,
        required: true
      },
      src: {
        type: String
      },
      media: {
        type: String,
        default: "(min-width: 992px)"
      }
    }
  }
</script>

<style lang="scss" scoped>
  picture {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
</style>
