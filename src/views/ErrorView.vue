<template>
  <section>
    <h1>Page Not Found !</h1>

    <figure>
      <img 
      src="img/errors/error-404.webp" 
      alt="Error 404">
    </figure>

    <a href="/">
      <i class="fa-regular fa-hand-point-right"></i>
      Go back home ?
      <i class="fa-regular fa-hand-point-left"></i>
    </a>

  </section>
</template>

<script>
  export default {
    name: 'ErrorView'
  }
</script>

<style scoped>
  section {
    text-align: center;
  }
</style>
