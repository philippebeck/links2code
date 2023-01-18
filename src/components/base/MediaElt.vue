<template>
  <figure :title="title">

    <audio
      v-if="type === 'audio'"
      controls
      :src="src"
      :loop="loop">
      <slot name="audio"></slot>
    </audio>

    <video 
      v-else-if="type === 'video'"
      controls
      :src="src"
      :loop="loop"
      :height="height"
      :width="width">
      <source 
        v-for="(video, index) in medias"
        :key="index"
        :src="video.src"
        :type="video.type">
      <slot name="video"></slot>
    </video>

    <picture 
      v-else-if="type === 'picture'">
      <source 
        v-for="(picture, index) in medias"
        :key="index"
        :srcset="picture.src"
        :media="picture.media"
        :type="picture.type">
      <img 
        :src="src"
        :alt="alt">
    </picture>

    <img
      v-else
      :src="src"
      :alt="alt">

    <figcaption v-if="hasSlot('figcaption')">
      <slot name="figcaption"></slot>
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: "MediaElt",

  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String
    },
    title: {
      type: String
    },
    type: {
      type: String,
      default: ""
    },
    medias: {
      type: Array
    },
    loop: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number
    },
    width: {
      type: Number,
      default: 300
    }
  },
  
  methods: {
    hasSlot(name) {
      return this.$slots[name] !== undefined;
    }
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

audio {
  --audio-border: 2px solid var(--black);
  --audio-border-radius: 10px;

  border: var(--audio-border);
  border-radius: var(--audio-border-radius);
}

video {
  --video-border: 2px solid var(--black);
  --video-border-radius: 20px;

  border: var(--video-border);
  border-radius: var(--video-border-radius);
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
