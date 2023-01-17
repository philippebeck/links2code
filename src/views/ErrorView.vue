<template>
  <main>
    <CardElt>
      <template #header>
        <h1>Page Not Found !</h1>
      </template>
      
      <template #body>
        <ImgElt
          src="/img/errors/error-404.webp" 
          alt="Error 404">
        </ImgElt>

        <BtnElt href="/">
          <template #btn>
            <i class="fa-regular fa-hand-point-right"></i>
            Go back home ?
            <i class="fa-regular fa-hand-point-left"></i>
          </template>
        </BtnElt>
      </template>
    </CardElt>
  </main>
</template>

<script>
import CardElt from "@/components/main/CardElt"
import ImgElt from "@/components/base/ImgElt"
import BtnElt from "@/components/base/BtnElt"

export default {
  name: 'ErrorView',
  components: {
    CardElt,
    ImgElt,
    BtnElt
  }
}
</script>
