Flipbook Vue 3 component

# Flipbook Vue 3

[English version](#description) | [Русская версия](#описание)

## Description

This package brings a vue 3 component that displays images in 3D page flip effect. Origin of this component is this repository: [flipbook-vue](https://github.com/ts1/flipbook-vue). Original repository provides a component that works nicely in vue 2, but due to errors and bugs in my vue 3 project I had to update it.

To ensure smooth performance, your web server should configure a cache policy for image files.

## Installation

To install this package, run the following command:

```bash
npm i @gladesinger/flipbook-vue3@latest
```

## Usage

You can use the `flipbook-vue3` component in your Vue 3 project as follows:

### Importing the Component

Import the component and use it in your Vue file:

```javascript
import FlipBook from '@gladesinger/flipbook-vue3';
import "@gladesinger/flipbook-vue3/dist/style.css"
```

Or register it as a Vue plugin:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import FlipBook from '@gladesinger/flipbook-vue3';
import "@gladesinger/flipbook-vue3/dist/style.css"

const app = createApp(App)
app.component('FlipBook', FlipBook)
app.mount('#app')
```

For usage in Nuxt it's better to wrap the component call in `ClientOnly`.

## Props

Here is a list of available props for the `flipbook-vue3` component:

### pages
Array of image URLs. Required. All images should have the same aspect ratio.
If the first element is null, the next element is displayed alone (as the cover page).
All other props are optional.

### alt
Prop that sets alt attribute for the images just for better seo performance.

### pagesHiRes
Array of high resolution versions of image URLs. They are used when zoomed.

### flipDuration
Duration of page flipping animation in milliseconds. Defaults to 1000.

### zoomDuration
Duration of zoom in/out animation in milliseconds. Defaults to 500.

### zooms
Array of possible magnifications. null is equivalent to [1] (no zoom). Defaults to [1, 2, 4]. NOTE : Do NOT pass an empty array.

### ambient
Intensity of ambient light in 0 to 1. Smaller value gives more shades. Defaults to 0.4.

### gloss
Intensity of specular light in 0 to 1. Higher value gives more gloss. Defaults to 0.6.

### perspective
Z-axis distance in pixels between the screen and the viewer. Higher value gives less effect. Defaults to 2400.

### nPolygons
How many rectangles a single page is horizontally split into. Higher value gives higher quality rendering in exchange for performance. Defaults to 10.

### singlePage
Force single page mode regardless of viewport size. Defaults to false.

### forwardDirection
Reading direction. If your document is right-to-left, set this "left". Default is "right".

### centering
Enable centering of the cover pages. Default is true.

### startPage
Page number (>= 1) to open. Default is null.

### loadingImage
URL of an image that is displayed while page is loading. By default internal animated SVG is used.

### clickToZoom
Zoom in or out on click or tap. Default is true.

### dragToFlip
Flip page by dragging/swiping. Default is true.

### wheel
When set to 'zoom', mouse wheel events zoom in/out the page. Default is 'scroll', wheel events and touch pad scroll gestures scroll the zoomed page.

## Events

The `flipbook-vue3` component supports the following events:

### flip-left-start
Fired when flip to left animation starts. Argument is page number before flip.

### flip-left-end
Fired when flip to left animation ends. Argument is page number after flip.

### flip-right-start
Fired when flip to right animation starts. Argument is page number before flip.

### flip-right-end
Fired when flip to right animation ends. Argument is page number after flip.

### zoom-start
Fired when zoom-in/out animation starts. Argument is magnification after zoom.

### zoom-end
Fired when zoom-in/out animation ends. Argument is magnification after zoom.

## Slot props

This component exposes some properties and methods as slot properties. Example usage:

```javascript
<flipbook :pages="pages" v-slot="flipbook">
  <button @click="flipbook.flipLeft">Previous Page</button>
  <button @click="flipbook.flipRight">Next Page</button>
</flipbook>
```

### canFlipLeft
True if it can flip to previous page. NOTE: Can return false if currently being animated.

### canFlipRight
True if it can flip to next page. NOTE: Can return false if currently being animated.

### canZoomIn
True if it can zoom in.

### canZoomOut
True if it can zoom out.

### page
Current page number (1 to numPages).

### numPages
Total number of pages.

### flipLeft()
Method to flip to previous page.

### flipRight()
Method to flip to next page.

### zoomIn()
Method to zoom in.

### zoomOut()
Method to zoom out.

## Usage Examples

```vue
<script setup lang="ts">
import { ref } from 'vue'
import FlipBook from '@gladesinger/flipbook-vue3';
import "@gladesinger/flipbook-vue3/dist/style.css"
import IconArrow from './components/IconArrow.vue'

// Array of image paths
const pages = ref([])
</script>

<template>
  <div class="slider-wrap">
    <FlipBook v-slot="flipbook" class="flipbook" :pages="pages" :gloss="0" :click-to-zoom="true" alt="Book slide">
      <button aria-label="Previous" class="flipbook-button button-prev" :class="{'disabled': !flipbook.canFlipLeft}" @click="flipbook.flipLeft">
        <IconArrow />
      </button>
      <button aria-label="Next" class="flipbook-button button-next" :class="{'disabled': !flipbook.canFlipRight}" @click="flipbook.flipRight">
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
```

## Описание

Этот пакет предоставляет Vue 3 компонент для отображения изображений с 3D-эффектом переворачивания страниц. Первоначальный источник этого компонента: [flipbook-vue](https://github.com/ts1/flipbook-vue). Оригинальный репозиторий предоставляет компонент для Vue 2, но из-за ошибок и проблем в моем проекте на Vue 3 мне пришлось обновить его.

Для плавного пролистывания, необходимо установить кэш заголовки для изображений на вэб-сервере.

## Установка

Чтобы установить этот пакет, выполните следующую команду:

```bash
npm i @gladesinger/flipbook-vue3@latest
```

## Использование

Вы можете использовать компонент `flipbook-vue3` в своем проекте Vue 3 следующим образом:

### Импорт компонента

Импортируйте компонент и используйте его в своем Vue-файле:

```javascript
import FlipBook from '@gladesinger/flipbook-vue3';
import "@gladesinger/flipbook-vue3/dist/style.css"
```

Или зарегистрируйте его как плагин Vue:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import FlipBook from '@gladesinger/flipbook-vue3';
import "@gladesinger/flipbook-vue3/dist/style.css"

const app = createApp(App)
app.component('FlipBook', FlipBook)
app.mount('#app')
```

Для использования в Nuxt рекомендуется обернуть вызов компонента в `ClientOnly`.

## Свойства (Props)

Ниже представлен список доступных свойств для компонента `flipbook-vue3`:

### pages
Массив URL-адресов изображений. Обязательный параметр. Все изображения должны быть с одинаковым соотношением сторон.  
Если первый элемент равен null, следующий элемент отображается отдельно (в качестве обложки).  
Все остальные свойства являются необязательными.

### alt
Свойство для задания атрибута `alt` для изображений, чтобы улучшить SEO.

### pagesHiRes
Массив URL-адресов изображений высокого разрешения. Они используются при увеличении.

### flipDuration
Длительность анимации переворачивания страниц в миллисекундах. По умолчанию: 1000.

### zoomDuration
Длительность анимации увеличения/уменьшения в миллисекундах. По умолчанию: 500.

### zooms
Массив возможных масштабов. null эквивалентен [1] (без увеличения). По умолчанию: [1, 2, 4].  
**Важно:** Не передавайте пустой массив.

### ambient
Интенсивность окружающего света (от 0 до 1). Меньшее значение дает больше теней. По умолчанию: 0.4.

### gloss
Интенсивность бликов (от 0 до 1). Большее значение добавляет больше глянца. По умолчанию: 0.6.

### perspective
Расстояние по оси Z в пикселях между экраном и зрителем. Большее значение уменьшает эффект. По умолчанию: 2400.

### nPolygons
Количество горизонтальных прямоугольников, на которые разделена одна страница. Большее значение улучшает качество рендеринга за счет производительности. По умолчанию: 10.

### singlePage
Принудительное включение режима одной страницы независимо от размера экрана. По умолчанию: false.

### forwardDirection
Направление чтения. Для документов справа-налево установите значение "left". По умолчанию: "right".

### centering
Включение центрирования обложек. По умолчанию: true.

### startPage
Номер страницы (>= 1) для открытия. По умолчанию: null.

### loadingImage
URL-адрес изображения, отображаемого во время загрузки страницы. По умолчанию используется встроенный анимированный SVG.

### clickToZoom
Увеличение/уменьшение при нажатии или касании. По умолчанию: true.

### dragToFlip
Переворачивание страницы с помощью перетаскивания/свайпа. По умолчанию: true.

### wheel
При значении 'zoom' колесо мыши увеличивает/уменьшает страницу. По умолчанию: 'scroll', жесты прокрутки скроллят увеличенную страницу.

## События

Компонент `flipbook-vue3` поддерживает следующие события:

### flip-left-start
Вызывается, когда начинается анимация переворота влево. Аргумент - номер страницы до переворота.

### flip-left-end
Вызывается, когда завершается анимация переворота влево. Аргумент - номер страницы после переворота.

### flip-right-start
Вызывается, когда начинается анимация переворота вправо. Аргумент - номер страницы до переворота.

### flip-right-end
Вызывается, когда завершается анимация переворота вправо. Аргумент - номер страницы после переворота.

### zoom-start
Вызывается, когда начинается анимация увеличения/уменьшения. Аргумент - масштаб после увеличения.

### zoom-end
Вызывается, когда завершается анимация увеличения/уменьшения. Аргумент - масштаб после увеличения.

## Свойства слотов

Этот компонент предоставляет свойства и методы через слоты. Пример использования:

```javascript
<flipbook :pages="pages" v-slot="flipbook">
  <button @click="flipbook.flipLeft">Предыдущая страница</button>
  <button @click="flipbook.flipRight">Следующая страница</button>
</flipbook>
```

### canFlipLeft
Возвращает true, если возможно перелистывание на предыдущую страницу.  
**Примечание:** Может возвращать false во время анимации.

### canFlipRight
Возвращает true, если возможно перелистывание на следующую страницу.  
**Примечание:** Может возвращать false во время анимации.

### canZoomIn
Возвращает true, если возможно увеличение.

### canZoomOut
Возвращает true, если возможно уменьшение.

### page
Текущий номер страницы (от 1 до numPages).

### numPages
Общее количество страниц.

### flipLeft()
Метод для перелистывания на предыдущую страницу.

### flipRight()
Метод для перелистывания на следующую страницу.

### zoomIn()
Метод для увеличения.

### zoomOut()
Метод для уменьшения.

## Пример использования

```vue
<script setup lang="ts">
import { ref } from 'vue'
import FlipBook from '@gladesinger/flipbook-vue3';
import "@gladesinger/flipbook-vue3/dist/style.css"
import IconArrow from './components/IconArrow.vue'

// Массив путей к изображениям
const pages = ref([])
</script>

<template>
  <div class="slider-wrap">
    <FlipBook v-slot="flipbook" class="flipbook" :pages="pages" :gloss="0" :click-to-zoom="true" alt="Книга">
      <button aria-label="Предыдущая" class="flipbook-button button-prev" :class="{'disabled': !flipbook.canFlipLeft}" @click="flipbook.flipLeft">
        <IconArrow />
      </button>
      <button aria-label="Следующая" class="flipbook-button button-next" :class="{'disabled': !flipbook.canFlipRight}" @click="flipbook.flipRight">
        <IconArrow />
      </button>
    </FlipBook>
  </div>
</template>

<style scoped>
/* Стили */
</style>
```