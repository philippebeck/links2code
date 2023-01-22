<template>
  <figure 
    id="slider" 
    class="slider">

    <ul class="controls">
      <li>
        <button 
          @click="goPrevious()"
          title="Previous (&larr;)">
          <i class="fas fa-step-backward fa-2x"></i>
        </button>
      </li>
      <li>
        <button 
          @click="checkRandom()"
          id="slider-random" 
          title="Random (&uarr;)">
          <i class="fas fa-random fa-2x"></i>
        </button>
      </li>
      <li>
        <button 
          @click="checkAuto()"
          id="slider-auto" 
          title="Pause (&darr;)">
          <i class="fas fa-pause fa-2x"></i>
        </button>
      </li>
      <li>
        <button 
          @click="goNext()"
          title="Next (&rarr;)">
          <i class="fas fa-step-forward fa-2x"></i>
        </button>
      </li>
    </ul>

    <ul 
      id="slides" 
      class="slides">
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

          <figcaption>
            <slot name="figcaption"></slot>
          </figcaption>
        </figure>
      </li>
    </ul>

    <ul class="timeline">
      <li
        v-for="(slide, index) in slides"
        :key="index">
        <i 
          class="fas fa-dot-circle" 
          aria-hidden="true">
        </i>
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
    }
  },

  data() {
    return {
      index: -1,
      timer: null,
      timeout: 2000,
      autoElt: null,
      autoState: true,
      randomElt: null,
      randomState: false
    }
  },

  mounted() {
    this.autoElt    = document.getElementById("slider-auto");
    this.randomElt  = document.getElementById("slider-random");

    document.addEventListener("keydown", this.setKeyboard);

    this.runSlider();
  },

  methods: {
    /**
     * RUN SLIDER
     */
    runSlider() {
      if (this.autoState) {
        this.timer = window.setInterval(this.goNext, this.timeout);

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
     * GET RANDOM INTEGER
     * @param {number} min
     * @param {number} max
     * @return
     */
    getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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
     * CHECK AUTO
     */
    checkAuto() {
      if (this.autoState) {
        this.setAuto(false, "Play", "fa-play", "fa-pause");
        window.clearInterval(this.timer);

      } else {
        this.setAuto(true, "Pause", "fa-pause", "fa-play");
        this.timer = window.setInterval(this.goNext, this.timeout);
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
    }
  }
}
</script>

<style scoped>
.slider {
  --slider-margin: var(--slider-figcaption-height) auto -20px;
  --slider-width: 100%;

  position: relative;
  margin: var(--slider-margin);
  width: var(--slider-width);
}
.slides {
  --slider-relay-text-align: center;
  text-align: var(--slider-relay-text-align);
}

[id*="slide-"] {
  display: none;
}

figcaption {
  --slider-figcaption-top: -45%;
  --slider-figcaption-left: 0;
  --slider-figcaption-padding: 5px 20px;
  --slider-figcaption-width: 100%;
  --slider-figcaption-height: 20%;
  --slider-figcaption-font-weight: bold;

  position: absolute;
  top: var(--slider-figcaption-top);
  left: var(--slider-figcaption-left);
  padding: var(--slider-figcaption-padding);
  width: var(--slider-figcaption-width);
  height: var(--slider-figcaption-height);
  font-weight: var(--slider-figcaption-font-weight);
}

.controls {
  display: flex;
  gap: 10px;
  place-content: center;
  opacity: 0;
}

.slider:hover .controls,
.slider:focus .controls {
  --slider-controls-hover-opacity: 1;
  opacity: var(--slider-controls-hover-opacity);
}

button {
  --slider-button-border: none;
  --slider-button-font-size: 60%;
  --slider-button-background: none;
  --slider-button-color: var(--grey-dark);

  position: static;
  border: var(--slider-button-border);
  font-size: var(--slider-button-font-size);
  background: var(--slider-button-background);
  color: var(--slider-button-color);
}

.timeline {
  --timeline-display: flex;
  --timeline-gap: 5px;
  --timeline-place-content: center;
  --timeline-opacity: 0;

  display: var(--timeline-display);
  gap: var(--timeline-gap);
  place-content: var(--timeline-place-content);
  opacity: var(--timeline-opacity);
}

.slider:hover .timeline,
.slider:focus .timeline {
  --timeline-hover-opacity: 1;
  opacity: var(--timeline-hover-opacity);
}

.show {
  display: list-item;
}
</style>
