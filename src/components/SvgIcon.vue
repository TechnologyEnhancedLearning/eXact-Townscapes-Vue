<template>
  <div>
    <svg v-if="icon === 'pin'" tabindex="-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 299.58 299.58" xml:space="preserve">

      <circle :style="{ fill: color3 }" cx="149.79" cy="149.79" r="149.79"/>
      <circle :style="{ fill: color2 }" cx="149.79" cy="149.79" r="98.32"/>
      <path :style="{ fill: color1 }" d="M182.04,134.29c0,17.67-26.5,62.5-31.52,62.55c-5.36,0.05-32.48-44.87-32.48-62.55c0-17.67,14.33-32,32-32
        S182.04,116.62,182.04,134.29z M150.04,115.79c-9.94,0-18,8.06-18,18c0,9.94,8.06,18,18,18c9.94,0,18-8.06,18-18
        C168.04,123.85,159.98,115.79,150.04,115.79z"/>
    </svg>

    <svg v-if="icon === 'arrow'" tabindex="-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 299.58 299.58" xml:space="preserve">
      <circle :style="{ fill: color3 }" cx="149.79" cy="149.79" r="149.79"/>
      <circle :style="{ fill: color2 }" cx="149.79" cy="149.79" r="98.32"/>
      <path :style="{ fill: color1 }" d="M154.53,124.01l10.27,23.63l10.27,23.97c1.54,3.6-1.03,7.19-4.62,7.02l-13.87,0.17v14.73
        c0,8.9-13.36,8.9-13.36,0v-14.73l-13.87-0.17c-3.94,0.17-6.34-3.94-4.62-7.36l10.27-23.63l10.27-23.63
        C146.99,119.9,152.82,119.9,154.53,124.01z M164.8,105.86c1.54-1.54,3.94,0.86,2.4,2.4l-8.9,8.9c-1.54,1.54-3.94-0.86-2.4-2.4
        L164.8,105.86z M172.68,121.61c2.23-0.17,2.23,3.25,0.17,3.25h-12.67c-2.05,0-2.23-3.25,0-3.42L172.68,121.61z M126.96,124.87
        c-2.05,0-2.05-3.42,0.17-3.25l12.5-0.17c2.23,0.17,2.05,3.42,0,3.42H126.96z M132.61,108.26c-1.54-1.54,0.86-3.94,2.4-2.4l8.9,8.9
        c1.54,1.54-0.86,3.94-2.4,2.4L132.61,108.26z M148.36,100.38c-0.17-2.23,3.25-2.23,3.08,0l0.17,12.5c-0.17,2.23-3.25,2.23-3.42,0
        L148.36,100.38z"/>
    </svg>

    <svg v-if="icon === 'scrollArrow'" height="50" width="70" x="0px" y="0px" viewBox="0 0 50 50" tabindex="-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
        <path d="M54.58,22.57,38.12,29.73,21.66,36.88a3.49,3.49,0,0,1-5.13-3.22L16.41,24H6.15c-6.2,0-6.2-9.3,0-9.3H16.41L16.53,5a3.4,3.4,0,0,1,4.89-3.22L38.12,9l16.46,7.16A3.49,3.49,0,0,1,54.58,22.57Z" transform="translate(0 0)"
        :style="{ fill: color2, stroke: color1 }"
        stroke-miterlimit="10" stroke-width="3" fill-rule="evenodd"/>
    </svg>

    <svg v-if="icon === 'back'" tabindex="-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 299.58 299.58" xml:space="preserve">
      <g>
        <path :style="{ fill: color1 }" d="M62.3,47.93V352.07a4,4,0,0,0,6,3.47L331.7,203.46a4,4,0,0,0,0-6.92L68.3,44.46A4,4,0,0,0,62.3,47.93Z" transform="translate(-62.3 -43.92)"/>
      </g>
    </svg>

    <svg v-if="icon === 'close'" tabindex="-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 299.58 299.58" xml:space="preserve">
      <g>
        <path :style="{ fill: color2 }" d="M150,35c30.72,0,59.6,11.96,81.32,33.68S265,119.28,265,150s-11.96,59.6-33.68,81.32S180.72,265,150,265
          s-59.6-11.96-81.32-33.68S35,180.72,35,150s11.96-59.6,33.68-81.32S119.28,35,150,35 M150,0C67.16,0,0,67.16,0,150
          s67.16,150,150,150s150-67.16,150-150S232.84,0,150,0L150,0z"/>
        <path :style="{ fill: color2 }" d="M175.25,150.5l27.22-27.22c6.83-6.83,6.83-17.91,0-24.75c-6.83-6.83-17.91-6.83-24.75,0l-27.22,27.22
          l-27.22-27.22c-6.83-6.83-17.92-6.83-24.75,0c-6.83,6.83-6.83,17.91,0,24.75l27.22,27.22l-27.22,27.22
          c-6.83,6.83-6.83,17.91,0,24.75c3.42,3.42,7.9,5.13,12.37,5.13s8.96-1.71,12.37-5.13l27.22-27.22l27.22,27.22
          c3.42,3.42,7.9,5.13,12.37,5.13s8.96-1.71,12.37-5.13c6.83-6.83,6.83-17.91,0-24.75L175.25,150.5z"/>
      </g>
    </svg>

    <svg v-if="icon === 'accessiblityOff'" tabindex="-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 299.58 299.58" xml:space="preserve">
      <g>
        <circle :style="{ fill: color1 }" cx="157.22" cy="34.9" r="34.9"/>
        <path   :style="{ fill: color1 }" d="M157.94,152.73V218a31.45,31.45,0,0,1-.67,6.42L127.88,364.55a16.14,16.14,0,0,0,31.26,7.92l35.12-117.73a6,6,0,0,1,11.48,0l35.12,117.73a16.14,16.14,0,0,0,31.26-7.92l-14.87-70.89-99.36-141.9C157.91,152.08,157.94,152.4,157.94,152.73Z" transform="translate(-42.78 -16)"/>
        <path   :style="{ fill: color1 }" d="M57.25,97.74a14.47,14.47,0,0,0-1.56,28.85l87.32,9.5a17.08,17.08,0,0,1,4.8,1.27L120.07,97.74Z" transform="translate(-42.78 -16)"/>
        <path   :style="{ fill: color1 }" d="M242.06,152.73A16.75,16.75,0,0,1,257,136.09l87.32-9.5a14.47,14.47,0,0,0-1.56-28.85h-176l75.33,107.59Z" transform="translate(-42.78 -16)"/>
      </g>
    </svg>

    <svg v-if="icon === 'accessiblityOn'" tabindex="-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 299.58 299.58" xml:space="preserve">
      <g>
        <circle :style="{ fill: color1 }" cx="157.22" cy="34.9" r="34.9"/>
        <path :style="{ fill: color1 }" d="M240.86,372.47a16.13,16.13,0,0,0,18.57,11.23h0a16.14,16.14,0,0,0,12.69-19.15L242.73,224.42a31.45,31.45,0,0,1-.67-6.42V152.73A16.75,16.75,0,0,1,257,136.09l87.32-9.5a14.48,14.48,0,0,0,12.91-14.38h0a14.47,14.47,0,0,0-14.47-14.47H57.25a14.47,14.47,0,0,0-14.47,14.47h0a14.48,14.48,0,0,0,12.91,14.38l87.32,9.5a16.75,16.75,0,0,1,14.93,16.64V218a31.45,31.45,0,0,1-.67,6.42L127.88,364.55a16.14,16.14,0,0,0,12.69,19.15h0a16.13,16.13,0,0,0,18.57-11.23l35.12-117.73a6,6,0,0,1,11.48,0Z" transform="translate(-42.78 -16)"/>
      </g>
    </svg>

    <svg v-if="icon === 'stopAnimations'" tabindex="-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 299.58 299.58" xml:space="preserve">
      <g>
        <rect :style="{ fill: color1 }" width="318" height="318" rx="6"/>
      </g>
    </svg>

    <svg v-if="icon === 'startAnimations'" tabindex="-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 299.58 299.58" xml:space="preserve">
      <g>
        <path :style="{ fill: color1 }" d="M62.3,47.93V352.07a4,4,0,0,0,6,3.47L331.7,203.46a4,4,0,0,0,0-6.92L68.3,44.46A4,4,0,0,0,62.3,47.93Z" transform="translate(-62.3 -43.92)"/>
      </g>
    </svg>

    <svg v-if="icon === 'hideHotspots'" tabindex="-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 390 340" xml:space="preserve">
      <g>
        <path :style="{ fill: color1 }" d="M364.54,45.41H217.28a4,4,0,0,0-4,4V350.15a4,4,0,0,0,4,4H364.54a4,4,0,0,0,4-4V49.41A4,4,0,0,0,364.54,45.41Z" transform="translate(-23.23 -23.37)"/>
        <path :style="{ fill: color1 }" d="M107.52,179.31a3.49,3.49,0,0,0-5,0L23.23,350.64a3.51,3.51,0,0,0,3.51,3.51H183.35a3.51,3.51,0,0,0,3.51-3.51Z" transform="translate(-23.23 -23.37)"/>

      </g>
    </svg>
    <svg v-if="icon === 'showHotspots'" tabindex="-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 390 340" xml:space="preserve">
      <g>
        <path :style="{ fill: color1 }" d="M364.54,45.41H217.28a4,4,0,0,0-4,4V350.15a4,4,0,0,0,4,4H364.54a4,4,0,0,0,4-4V49.41A4,4,0,0,0,364.54,45.41Z" transform="translate(-23.23 -23.37)"/>
        <path :style="{ fill: color1 }" d="M107.52,179.31a3.49,3.49,0,0,0-5,0L23.23,350.64a3.51,3.51,0,0,0,3.51,3.51H183.35a3.51,3.51,0,0,0,3.51-3.51Z" transform="translate(-23.23 -23.37)"/>
        <path :style="{ fill: color2 }" d="M380.52,376.85h-8a4,4,0,0,1,0-8h4v-4a4,4,0,0,1,8,0v8A4,4,0,0,1,380.52,376.85Z" transform="translate(-23.23 -23.37)"/>
        <path :style="{ fill: color2 }" d="M353.26,376.85H336.15a4,4,0,0,1,0-8h17.11a4,4,0,0,1,0,8Zm-36.37,0H299.78a4,4,0,0,1,0-8h17.11a4,4,0,0,1,0,8Zm-36.37,0H263.4a4,4,0,0,1,0-8h17.12a4,4,0,0,1,0,8Zm-36.37,0H227a4,4,0,1,1,0-8h17.12a4,4,0,0,1,0,8Z" transform="translate(-23.23 -23.37)"/>
        <path :style="{ fill: color2 }" d="M207.78,376.85h-8a4,4,0,0,1-4-4v-8a4,4,0,0,1,8,0v4h4a4,4,0,0,1,0,8Z" transform="translate(-23.23 -23.37)"/>
        <path :style="{ fill: color2 }" d="M199.78,350.55a4,4,0,0,1-4-4V330.28a4,4,0,0,1,8,0v16.27A4,4,0,0,1,199.78,350.55Zm0-34.58a4,4,0,0,1-4-4V295.7a4,4,0,0,1,8,0V312A4,4,0,0,1,199.78,316Zm0-34.57a4,4,0,0,1-4-4V261.13a4,4,0,0,1,8,0V277.4A4,4,0,0,1,199.78,281.4Zm0-34.58a4,4,0,0,1-4-4V226.55a4,4,0,0,1,8,0v16.27A4,4,0,0,1,199.78,246.82Zm0-34.57a4,4,0,0,1-4-4V192a4,4,0,0,1,8,0v16.27A4,4,0,0,1,199.78,212.25Zm0-34.58a4,4,0,0,1-4-4V157.4a4,4,0,0,1,8,0v16.27A4,4,0,0,1,199.78,177.67Zm0-34.57a4,4,0,0,1-4-4V122.82a4,4,0,0,1,8,0V139.1A4,4,0,0,1,199.78,143.1Zm0-34.58a4,4,0,0,1-4-4V88.25a4,4,0,1,1,8,0v16.27A4,4,0,0,1,199.78,108.52Zm0-34.57a4,4,0,0,1-4-4V53.67a4,4,0,1,1,8,0V70A4,4,0,0,1,199.78,74Z" transform="translate(-23.23 -23.37)"/>
        <path :style="{ fill: color2 }" d="M199.78,39.37a4,4,0,0,1-4-4v-8a4,4,0,0,1,4-4h8a4,4,0,0,1,0,8h-4v4A4,4,0,0,1,199.78,39.37Z" transform="translate(-23.23 -23.37)"/>
        <path :style="{ fill: color2 }" d="M353.26,31.37H336.15a4,4,0,0,1,0-8h17.11a4,4,0,0,1,0,8Zm-36.37,0H299.78a4,4,0,0,1,0-8h17.11a4,4,0,0,1,0,8Zm-36.37,0H263.4a4,4,0,0,1,0-8h17.12a4,4,0,0,1,0,8Zm-36.37,0H227a4,4,0,0,1,0-8h17.12a4,4,0,0,1,0,8Z" transform="translate(-23.23 -23.37)"/>
        <path :style="{ fill: color2 }" d="M380.52,39.37a4,4,0,0,1-4-4v-4h-4a4,4,0,0,1,0-8h8a4,4,0,0,1,4,4v8A4,4,0,0,1,380.52,39.37Z" transform="translate(-23.23 -23.37)"/>
        <path :style="{ fill: color2 }" d="M380.52,350.55a4,4,0,0,1-4-4V330.28a4,4,0,0,1,8,0v16.27A4,4,0,0,1,380.52,350.55Zm0-34.58a4,4,0,0,1-4-4V295.7a4,4,0,0,1,8,0V312A4,4,0,0,1,380.52,316Zm0-34.57a4,4,0,0,1-4-4V261.13a4,4,0,0,1,8,0V277.4A4,4,0,0,1,380.52,281.4Zm0-34.58a4,4,0,0,1-4-4V226.55a4,4,0,1,1,8,0v16.27A4,4,0,0,1,380.52,246.82Zm0-34.57a4,4,0,0,1-4-4V192a4,4,0,0,1,8,0v16.27A4,4,0,0,1,380.52,212.25Zm0-34.58a4,4,0,0,1-4-4V157.4a4,4,0,1,1,8,0v16.27A4,4,0,0,1,380.52,177.67Zm0-34.57a4,4,0,0,1-4-4V122.83a4,4,0,1,1,8,0V139.1A4,4,0,0,1,380.52,143.1Zm0-34.58a4,4,0,0,1-4-4V88.25a4,4,0,0,1,8,0v16.27A4,4,0,0,1,380.52,108.52Zm0-34.57a4,4,0,0,1-4-4V53.67a4,4,0,0,1,8,0V70A4,4,0,0,1,380.52,74Z" transform="translate(-23.23 -23.37)"/>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    ariaLabel: {
      type: String,
      default: ""
    },
    icon: String,
    classes: String,
    color1: String,
    color2: String,
    color3: String
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
