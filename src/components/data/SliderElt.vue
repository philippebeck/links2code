<template>
  <div 
    id="slider" 
    class="slider">
    <input 
      id="slider-radio1" 
      class="slider-radio1" 
      type="radio" 
      name="slider" 
      disabled 
      checked>
    <input 
      id="slider-radio2" 
      class="slider-radio2" 
      type="radio" 
      name="slider" 
      disabled>

    <figure 
      id="slider-relay" 
      class="slider-relay">
      <figure class="slider-target1">
        <img 
          src="https://animadio.org/img/numbers/1.svg" 
          alt="Your awesome alternate text">
        <figcaption>
          <a 
            href="https://animadio.org" 
            title="Your awesome title">
            <h2>Your 1st title</h2>
            <p>Your 1st description</p>
            <i class="fas fa-image"></i>
          </a>
        </figcaption>
      </figure>
      <figure class="slider-target2">
        <img 
        src="https://animadio.org/img/numbers/2.svg" 
        alt="Your awesome alternate text">
      <figcaption>
        <a 
          href="https://animadio.org" 
          title="Your awesome title">
          <h2>Your 2nd title</h2>
          <p>Your 2nd description</p>
          <i class="fas fa-image"></i>
        </a>
      </figcaption>
      </figure>
    </figure>

    <ul>
      <li>
        <button 
          id="slider-previous" 
          class="slider-previous" 
          title="Previous (&larr;)">
          <i class="fas fa-step-backward fa-2x"></i>
        </button>
      </li>
      <li>
        <button 
          id="slider-auto" 
          class="slider-auto" 
          title="Pause (&uarr;)">
          <i class="fas fa-pause fa-2x"></i>
        </button>
      </li>
      <li class="hide">
        <button 
          id="slider-random" 
          class="slider-random" 
          title="Random (&darr;)">
          <i class="fas fa-random fa-2x"></i>
        </button>
      </li>
      <li>
        <button 
          id="slider-next" 
          class="slider-next" 
          title="Next (&rarr;)">
          <i class="fas fa-step-forward fa-2x"></i>
        </button>
      </li>
    </ul>

    <ul class="slider-progress">
      <li>
        <label for="slider-radio1">
          <i 
            class="fas fa-dot-circle" 
            aria-hidden="true"></i>
        </label>
      </li>
      <li>
        <label for="slider-radio2">
          <i 
            class="fas fa-dot-circle" 
            aria-hidden="true"></i>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SliderElt",

  data() {
    return {
      sliderElt: null,
      slidesTriggers: null,
      slidesCount: 0,
      index: -1,
      timer: null,
      timeout: timeout,
      previousElt: null,
      nextElt: null,
      autoElt: null,
      autoIcon: null,
      autoState: auto,
      randomElt: null,
      randomIcon: null,
      randomState: random
    }
  },

  methods: {
    runSlider() {
      if (this.autoState) {
        this.timer = window.setInterval(this.goNext, this.timeout);
      } else {
        this.goNext();
      }
    },

    /**
     * @param {Object} event
     */
    setKeyboard(event) {
      switch (event.code) {
        case "ArrowLeft":
          this.goPrevious();
          break;
        case "ArrowUp":
          this.checkAuto();
          break;
        case "ArrowDown":
          this.checkRandom();
          break;
        case "ArrowRight":
          this.goNext();
          break;
      }
    },

    goPrevious() {
      if (this.randomState) {
        this.index = getRandomInteger(0, this.slidesCount - 1);
      } else {
        this.index--;
        if (this.index < 0) {
          this.index = this.slidesCount - 1;
        }
      }
      refreshSlide();
    },

    goNext() {
      if (this.randomState) {
        this.index = getRandomInteger(0, this.slidesCount - 1);
      } else {
        this.index++;
        if (this.index >= this.slidesCount) {
          this.index = 0;
        }
      }
      refreshSlide();
    },

    checkAuto() {
      if (this.autoState) {
        this.setAuto(false, "Play", "fa-play", "fa-pause");
        window.clearInterval(this.timer);
      } else {
        this.setAuto(true, "Pause", "fa-pause", "fa-play");
        this.timer = window.setInterval(this.goNext, this.timeout);
      }
      refreshSlide();
    },

    checkRandom() {
      if (this.randomState) {
        this.setRandom(false, "Random", "fa-random", "fa-long-arrow-alt-right");
      } else {
        this.setRandom(true, "Normal", "fa-long-arrow-alt-right", "fa-random");
      }
      this.refreshSlide();
    },

    refreshSlide() {
      for (let i = 0; i < this.slidesCount; i++) {
        if (this.slidesTriggers[i].hasAttribute("checked")) {
          this.slidesTriggers[i].removeAttribute("checked");
        }
      }
      this.slidesTriggers[index].setAttribute("checked", true);
    },

    /**
     * @param {number} min
     * @param {number} max
     * @return
     */
    getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * @param {boolean} state
     * @param {string} title
     * @param {string} add
     * @param {string} remove
     */
    setAuto(state, title, add, remove) {
      this.autoState      = state;
      this.autoElt.title  = title;
      this.setIcon(this.autoIcon, add, remove);
    },

    /**
     * @param {boolean} state
     * @param {string} title
     * @param {string} add
     * @param {string} remove
     */
    setRandom(state, title, add, remove) {
      this.randomState      = state;
      this.randomElt.title  = title;
      this.setIcon(this.randomIcon, add, remove);
    },

    /**
     * @param {object} icon
     * @param {string} add
     * @param {string} remove
     */
    setIcon(icon, add, remove) {
      icon.classList.add(add);
      icon.classList.remove(remove);
    }
  },

  mounted() {
    this.sliderElt    = document.getElementById("slider");
    this.previousElt  = document.getElementById("slider-previous");
    this.nextElt      = document.getElementById("slider-next");
    this.autoElt      = document.getElementById("slider-auto");
    this.randomElt    = document.getElementById("slider-random");
    this.autoIcon     = this.autoElt.querySelector("i");
    this.randomIcon   = this.randomElt.querySelector("i");

    if (this.sliderElt.querySelectorAll("input")) {
      this.slidesTriggers = this.sliderElt.querySelectorAll("input");
      this.slidesCount    = this.slidesTriggers.length;
    }

    document.addEventListener("keydown", this.setKeyboard);
    this.previousElt.addEventListener("click", this.goPrevious);
    this.nextElt.addEventListener("click", this.goNext);
    this.autoElt.addEventListener("click", this.checkAuto);
    this.randomElt.addEventListener("click", this.checkRandom);

    this.initSlider();
  }
}
</script>

<style lang="scss" scoped>
.slider {
  --slider-margin: var(--slider-figcaption-height) auto -20px;
  --slider-width: 100%;
  --slider-relay-text-align: center;
  --slider-figcaption-top: -45%;
  --slider-figcaption-left: 0;
  --slider-figcaption-padding: 5px 20px;
  --slider-figcaption-width: 100%;
  --slider-figcaption-height: 20%;
  --slider-figcaption-font-weight: bold;
  --slider-button-border: none;
  --slider-button-font-size: 60%;
  --slider-button-background: none;
  --slider-button-color: var(--grey-dark);
  --slider-previous-top: 42%;
  --slider-previous-left: -1%;
  --slider-auto-bottom: 5%;
  --slider-auto-left: 45%;
  --slider-auto-opacity: 1;
  --slider-auto-hover-opacity: 1;
  --slider-random-top: 42%;
  --slider-random-left: 45%;
  --slider-random-opacity: 0;
  --slider-random-hover-opacity: 1;
  --slider-next-top: 42%;
  --slider-next-right: -1%;
  --slider-progress-place-content: center;
  --slider-progress-top: -5%;
  --slider-progress-margin-left: calc((100% - var(--slider-progress-width)) / 2);
  --slider-progress-width: 90%;
  --slider-progress-label-padding: 5px;
  --slider-progress-label-font-size: var(--slider-button-font-size);
  --slider-progress-label-color: var(--grey-dark);
  --slider-checked-content: "\f058";
}

@media (min-width: $breakpoint-sm) {
  .slider {
    --slider-figcaption-top: -35%;
    --slider-figcaption-height: 15%;
    --slider-button-font-size: 70%;
    --slider-previous-top: 44%;
    --slider-previous-left: 0;
    --slider-random-top: 44%;
    --slider-next-top: 44%;
    --slider-next-right: 0;
    --slider-auto-bottom: 6%;
    --slider-auto-left: 46%;
    --slider-random-left: 46%;
    --slider-progress-top: -2%;
    --slider-progress-width: 80%;
  }
}

@media (min-width: $breakpoint-md) {
  .slider {
    --slider-figcaption-top: -20%;
    --slider-figcaption-height: 10%;
    --slider-button-font-size: 80%;
    --slider-previous-top: 45%;
    --slider-random-top: 45%;
    --slider-next-top: 45%;
    --slider-auto-left: 47%;
    --slider-random-left: 47%;
    --slider-progress-top: 0;
    --slider-progress-width: 70%;
  }
}

@media (min-width: $breakpoint-lg) {
  .slider {
    --slider-figcaption-top: -15%;
    --slider-figcaption-height: 8%;
    --slider-button-font-size: 90%;
    --slider-previous-top: 46%;
    --slider-random-top: 46%;
    --slider-next-top: 46%;
    --slider-auto-left: 48%;
    --slider-random-left: 48%;
    --slider-progress-width: 60%;
  }
}

@media (min-width: $breakpoint-xl) {
  .slider {
    --slider-figcaption-top: -12%;
    --slider-figcaption-height: 6%;
    --slider-button-font-size: 100%;
    --slider-previous-top: 48%;
    --slider-random-top: 48%;
    --slider-next-top: 48%;
    --slider-auto-left: 49%;
    --slider-auto-opacity: 0;
    --slider-random-left: 49%;
    --slider-progress-width: 50%;
  }
}

@media (min-width: $breakpoint-wd) {
  .slider {
    --slider-figcaption-top: -10%;
    --slider-figcaption-height: 5%;
    --slider-button-font-size: 100%;
    --slider-previous-top: 48%;
    --slider-random-top: 48%;
    --slider-next-top: 48%;
    --slider-auto-left: 49%;
    --slider-auto-opacity: 0;
    --slider-random-left: 49%;
    --slider-progress-width: 50%;
  }
}

.slider {
  position: relative;
  margin: var(--slider-margin);
  width: var(--slider-width);

  & > .slider-relay {
    text-align: var(--slider-relay-text-align);
  }

  & [class*="target"] {
    display: none;
  }

  & figcaption {
    position: absolute;
    top: var(--slider-figcaption-top);
    left: var(--slider-figcaption-left);
    padding: var(--slider-figcaption-padding);
    width: var(--slider-figcaption-width);
    height: var(--slider-figcaption-height);
    font-weight: var(--slider-figcaption-font-weight);
  }

  & button {
    position: absolute;
    border: var(--slider-button-border);
    font-size: var(--slider-button-font-size);
    background: var(--slider-button-background);
    color: var(--slider-button-color);
  }

  &-previous {
    top: var(--slider-previous-top);
    left: var(--slider-previous-left);
  }

  &-auto {
    bottom: var(--slider-auto-bottom);
    left: var(--slider-auto-left);
    opacity: var(--slider-auto-opacity);
  }

  &:hover &-auto,
  &:focus &-auto {
    opacity: var(--slider-auto-hover-opacity);
  }

  &-random {
    top: var(--slider-random-top);
    left: var(--slider-random-left);
    opacity: var(--slider-random-opacity);
  }

  &:hover &-random,
  &:focus &-random {
    opacity: var(--slider-random-hover-opacity);
  }

  &-next {
    top: var(--slider-next-top);
    right: var(--slider-next-right);
  }

  &-progress {
    display: flex;
    position: absolute;
    place-content: var(--slider-progress-place-content);
    top: var(--slider-progress-top);
    margin-left: var(--slider-progress-margin-left);
    width: var(--slider-progress-width);

    & label {
      padding: var(--slider-progress-label-padding);
      font-size: var(--slider-progress-label-font-size);
      color: var(--slider-progress-label-color);
    }
  }
}

.slider-radio1:checked ~ .slider-relay .slider-target1,
.slider-radio2:checked ~ .slider-relay .slider-target2,
.slider-radio3:checked ~ .slider-relay .slider-target3,
.slider-radio4:checked ~ .slider-relay .slider-target4,
.slider-radio5:checked ~ .slider-relay .slider-target5,
.slider-radio6:checked ~ .slider-relay .slider-target6,
.slider-radio7:checked ~ .slider-relay .slider-target7,
.slider-radio8:checked ~ .slider-relay .slider-target8,
.slider-radio9:checked ~ .slider-relay .slider-target9 {
  display: inline-block;
}

.slider-radio1:checked ~ .slider-progress [for="slider-radio1"] *::before,
.slider-radio2:checked ~ .slider-progress [for="slider-radio2"] *::before,
.slider-radio3:checked ~ .slider-progress [for="slider-radio3"] *::before,
.slider-radio4:checked ~ .slider-progress [for="slider-radio4"] *::before,
.slider-radio5:checked ~ .slider-progress [for="slider-radio5"] *::before,
.slider-radio6:checked ~ .slider-progress [for="slider-radio6"] *::before,
.slider-radio7:checked ~ .slider-progress [for="slider-radio7"] *::before,
.slider-radio8:checked ~ .slider-progress [for="slider-radio8"] *::before,
.slider-radio9:checked ~ .slider-progress [for="slider-radio9"] *::before {
  content: var(--slider-checked-content);
}
</style>
