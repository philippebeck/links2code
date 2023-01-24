<template>
  <figure 
    class="slider">

    <ul class="controls">
      <li>
        <button 
          @click="goPrevious()"
          title="Previous (&larr;)">
          <i class="fas fa-step-backward fa-2x"></i>
        </button>
      </li>
      <li v-if="random === true">
        <button 
          @click="checkRandom()"
          id="slider-random" 
          title="Normal">
          <i class="fas fa-long-arrow-alt-right fa-2x"></i>
        </button>
      </li>
      <li v-else>
        <button 
          @click="checkRandom()"
          id="slider-random" 
          title="Random">
          <i class="fas fa-random fa-2x"></i>
        </button>
      </li>
      <li v-if="auto === true">
        <button 
          @click="checkAuto()"
          id="slider-auto" 
          title="Pause">
          <i class="fas fa-pause fa-2x"></i>
        </button>
      </li>
      <li v-else>
        <button 
          @click="checkAuto()"
          id="slider-auto" 
          title="Play">
          <i class="fas fa-play fa-2x"></i>
        </button>
      </li>
      <li>
        <button 
          @click="goNext()"
          title="Next">
          <i class="fas fa-step-forward fa-2x"></i>
        </button>
      </li>
    </ul>

    <ul class="slides">
      <li
        v-for="(slide, index) in slides"
        :key="index"
        :id="'slide-' + (index + 1)">

        <figure>
          <slot
            name="slide"
            :slide="slide"
            :index="index">
          </slot>

          <figcaption v-if="hasSlot('info')">
            <slot 
              name="info"
              :slide="slide"
              :index="index">
            </slot>
          </figcaption>
        </figure>
      </li>
    </ul>

    <ul class="gallery">
      <li
        v-for="(slide, index) in slides"
        :key="index"
        @click="setSlide(index)">

        <slot
          name="gallery"
          :slide="slide"
          :index="index">
        </slot>
      </li>
    </ul>
  </figure>
</template>

<script>
export default {
  name: "SliderElt",

  props: {
    slides: {
      type: Array
    },
    delay: {
      type: Number,
      default: 2000
    },
    auto: {
      type: Boolean,
      default: true
    },
    random: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      index: -1,
      intervalId: 0,
      autoElt: null,
      randomElt: null,
      autoState: this.auto,
      randomState: this.random
    }
  },

  beforeCreate() {
    for (let i = 0; i < 1000; i++) {
      clearTimeout(i);
    }
  },

  mounted() {
    this.autoElt    = document.getElementById("slider-auto");
    this.randomElt  = document.getElementById("slider-random");
    document.addEventListener("keydown", this.setKeyboard);
  },

  updated() {
    document.getElementById("slide-1").classList.add("show");
    this.runSlider();
  },

  methods: {
    /******************** SETTERS ********************/

    /**
     * SET ICON
     * @param {object} icon
     * @param {string} add
     * @param {string} remove
     */
    setIcon(icon, add, remove) {
      icon.classList.add(add);
      icon.classList.remove(remove);
    },

    /**
     * SET AUTO
     * @param {boolean} state
     * @param {string} title
     * @param {string} add
     * @param {string} remove
     */
    setAuto(state, title, add, remove) {
      this.autoState      = state;
      this.autoElt.title  = title;
      this.setIcon(this.autoElt.querySelector("i"), add, remove);
    },

    /**
     * SET RANDOM
     * @param {boolean} state
     * @param {string} title
     * @param {string} add
     * @param {string} remove
     */
    setRandom(state, title, add, remove) {
      this.randomState      = state;
      this.randomElt.title  = title;
      this.setIcon(this.randomElt.querySelector("i"), add, remove);
    },
    
    /**
     * SET SLIDE
     * @param {Number} index 
     */
    setSlide(index) {
      this.index = index;
      this.refreshSlide();
    },

    /**
     * SET KEYBOARD
     * @param {Object} event
     */
    setKeyboard(event) {
      switch (event.code) {
        case "ArrowLeft":
          this.goPrevious();
          break;
        case "ArrowUp":
          this.checkRandom();
          break;
        case "ArrowDown":
          this.checkAuto();
          break;
        case "ArrowRight":
          this.goNext();
          break;
      }
    },

    /******************** GETTERS ********************/

    /**
     * GET RANDOM INTEGER
     * @param {number} min
     * @param {number} max
     * @return
     */
    getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /******************** CHECKERS ********************/

    /**
     * HAS SLOT
     * @param {string} name 
     */
    hasSlot(name) {
      return this.$slots[name] !== undefined;
    },

    /**
     * CHECK AUTO
     */
    checkAuto() {
      if (this.autoState) {
        this.setAuto(false, "Play", "fa-play", "fa-pause");
        window.clearInterval(this.intervalId);
      } else {
        this.setAuto(true, "Pause", "fa-pause", "fa-play");
        this.intervalId = window.setInterval(this.goNext, this.delay);
      }
      this.refreshSlide();
    },

    /**
     * CHECK RANDOM
     */
    checkRandom() {
      if (this.randomState) {
        this.setRandom(false, "Random", "fa-random", "fa-long-arrow-alt-right");
      } else {
        this.setRandom(true, "Normal", "fa-long-arrow-alt-right", "fa-random");
      }
      this.refreshSlide();
    },

    /******************** MAIN ********************/

    /**
     * RUN SLIDER
     */
    runSlider() {
      if (this.autoState) {
        this.intervalId = window.setInterval(this.goNext, this.delay);
      } else {
        this.goNext();
      }
    },

    /**
     * REFRESH SLIDE
     */
    refreshSlide() {
      for (let i = 1; i <= this.slides.length; i++) {
        document.getElementById(`slide-${i}`).classList.remove("show");
      }
      document.getElementById(`slide-${this.index + 1}`).classList.add("show");
    },

    /**
     * GO NEXT SLIDE
     */
    goNext() {
      if (this.randomState) {
        this.index = this.getRandomInteger(0, this.slides.length - 1);
      } else {
        this.index++;
        if (this.index >= this.slides.length) {
          this.index = 0;
        }
      }
      this.refreshSlide();
    },

    /**
     * GO PREVIOUS SLIDE
     */
    goPrevious() {
      if (this.randomState) {
        this.index = this.getRandomInteger(0, this.slides.length - 1);
      } else {
        this.index--;
        if (this.index < 0) {
          this.index = this.slides.length - 1;
        }
      }
      this.refreshSlide();
    },
  }
}
</script>

<style scoped>
.slider {
  --slider-margin: var(--slider-figcaption-height) auto -20px;
  --slider-border: none;
  --slider-padding: 0;
  --slider-width: 100%;

  margin: var(--slider-margin);
  border: var(--slider-border);
  padding: var(--slider-padding);
  width: var(--slider-width);
}

[id*="slide-"] {
  --slide-display: none;
  display: var(--slide-display);
}

figcaption {
  --slider-figcaption-padding: 5px 20px;
  --slider-figcaption-width: 100%;
  --slider-figcaption-height: 20%;
  --slider-figcaption-font-weight: bold;
  --slider-figcaption-color: var(--sky);

  padding: var(--slider-figcaption-padding);
  width: var(--slider-figcaption-width);
  height: var(--slider-figcaption-height);
  font-weight: var(--slider-figcaption-font-weight);
  color: var(--slider-figcaption-color);
}

.controls {
  --controls-display: flex;
  --controls-gap: 10px;
  --controls-place-content: center;
  --controls-opacity: 1;

  display: var(--controls-display);
  gap: var(--controls-gap);
  place-content: var(--controls-place-content);
  opacity: var(--controls-opacity);
}

.slider:hover .controls,
.slider:focus .controls {
  --slider-controls-hover-opacity: 1;
  opacity: var(--slider-controls-hover-opacity);
}

.controls > *:hover,
.controls > *:focus {
  --controls-hover-color: var(--sky);
  color: var(--controls-hover-color);
}

button {
  --slider-button-border: none;
  --slider-button-font-size: 60%;
  --slider-button-background: none;
  --slider-button-color: var(--grey-dark);

  border: var(--slider-button-border);
  font-size: var(--slider-button-font-size);
  background: var(--slider-button-background);
  color: var(--slider-button-color);
}

.gallery {
  --gallery-display: flex;
  --gallery-gap: 10px;
  --gallery-place-content: center;
  --gallery-opacity: 1;
  --gallery-color: var(--gray);

  display: var(--gallery-display);
  gap: var(--gallery-gap);
  place-content: var(--gallery-place-content);
  opacity: var(--gallery-opacity);
  color: var(--gallery-color);
}

.slider:hover .gallery,
.slider:focus .gallery {
  --gallery-hover-opacity: 1;
  opacity: var(--gallery-hover-opacity);
}

.gallery > *:hover,
.gallery > *:focus {
  --gallery-child-hover-color: var(--sky);
  --gallery-child-hover-cursor: pointer;

  color: var(--gallery-child-hover-color);
  cursor: var(--gallery-child-hover-cursor);
}

.show {
  --slider-show-display: list-item;
  display: var(--slider-show-display);
}

@media (min-width: 1200px) {
  .controls {
  --controls-opacity: 0;
  }
  .gallery {
    --gallery-opacity: 0;
  }
}
</style>
