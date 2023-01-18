<template>
  <main>
    <CardElt>
      <template #header>
        <h1>Page Not Found !</h1>
      </template>
      
      <template #body>
        <MediaElt
          src="/img/errors/error-404.webp" 
          alt="Error 404">
        </MediaElt>

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
import MediaElt from "@/components/base/MediaElt"
import BtnElt from "@/components/base/BtnElt"

export default {
  name: 'ErrorView',
  components: {
    CardElt,
    MediaElt,
    BtnElt
  }
}
</script>
