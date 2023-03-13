<template>
  <div id="loading" role="alert" aria-label="Loading">
    <img class="smallScreen" src="@/assets/img/elfh_logo_resized.svg" alt="" />
    <img
      class="smallScreen"
      src="@/assets/img/HEE_logo_left_aligned.svg"
      alt=""
    />
    <img
      class="largeScreen"
      src="@/assets/img/elfh-hee-loading-logos.svg"
      alt=""
    />
    <div class="loading-grid-container" id="loadingTextAndAnimation">
      <div class="grid-child" id="loadingText">Loading...</div>
      <div class="grid-child" id="loadingAnimation">
        <img
          class="loading-animation"
          src="@/assets/img/Spinner-1s-200px.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingScreen"
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loading-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0px;
}

#loading {
  position: absolute;
  width: 60%;
  height: auto;
  top: 30%;
  left: 20%;
  text-align: center;
}

#loadingTextAndAnimation {
  padding-top: 2vw;
  margin: auto;
  width: 30%;
}

#loadingText {
  height: 8vw;
  line-height: 8vw;
  vertical-align: middle;
  font-size: 2vw;
  color: #006ab4;
}

#loadingAnimation {
  height: 8vw;
}

.loading-animation {
  display: block;
  margin: auto;
  height: 8vw;
}

.smallScreen {
  display: none;
}

.largeScreen {
  display: block;
}

@media (max-width: 480px) {
  .smallScreen {
    display: block;
    margin-bottom: 5vw;
  }
  .largeScreen {
    display: none;
  }

  #loadingTextAndAnimation {
    text-align: center;
    margin: 0;
    width: 60%;
  }

  #loadingText {
    padding-left: 1vw;
    font-size: 4vw;
  }
}
</style>
