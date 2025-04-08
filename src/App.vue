<script setup lang="ts">
import { ref } from "vue";
import FlipBook from "../lib/FlipBook.vue";
import IconArrow from "./components/IconArrow.vue";

// Array of image paths
const pages = ref([
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
]);
</script>

<template>
  <div class="slider-wrap">
    <FlipBook
      v-slot="flipbook"
      class="flipbook"
      :pages="pages"
      :gloss="0"
      :click-to-zoom="true"
      alt="Книжка"
    >
      <button
        aria-label="Предыдущий"
        class="flipbook-button button-prev"
        :class="{ disabled: !flipbook.canFlipLeft }"
        @click="flipbook.flipLeft"
      >
        <IconArrow />
      </button>
      <button
        aria-label="Следующий"
        class="flipbook-button button-next"
        :class="{ disabled: !flipbook.canFlipRight }"
        @click="flipbook.flipRight"
      >
        <IconArrow />
      </button>
    </FlipBook>
  </div>
</template>

<style scoped>
.slider-wrap {
  position: relative;
  width: 100vw;
  max-width: 1120px;
  margin: 0 auto;
}

.slider-wrap .flipbook {
  width: 100%;
  height: 410px;
  display: block;
}

.slider-wrap .flipbook img {
  max-width: 100%;
}

.slider-wrap .flipbook-button {
  position: absolute;
  top: 50%;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  outline: none;
}

.slider-wrap .flipbook-button.button-prev {
  left: -64px;
  transform: translateY(-50%);
}
.slider-wrap .flipbook-button.button-next {
  right: -64px;
  transform: rotate(180deg) translateY(50%);
}
.slider-wrap .flipbook-button.disabled {
  opacity: 0.35;
  cursor: auto;
  pointer-events: none;
}
</style>
