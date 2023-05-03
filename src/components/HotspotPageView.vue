<template>
  <small-hotspot-page-view :class="{ 'display': viewMode === 'smallOnly' }" :page="page" >
  </small-hotspot-page-view>
  <main id="hotspotPageView" style="position: absolute; left:0; top:0; width: 100%; height: 100%;" :style="{ backgroundColor: page.backgroundColor }"
        :class="{ 'display-none': viewMode !== 'normal', 'editor-on': sessionConfig.editorOn === true  }" >
    <div style="position: relative; height: 92%;">
      <div class="sr-only">{{ page.name }}</div>

      <div class="page-image-container">
        <img :src="page.backgroundImgSrc" class="page-image" alt="" >
      </div>

      <ul class="circle-links">

        <li class="top">
          <button class="hide grow" @click="selectLink(sessionConfig.overview)">
            <svg-icon class="icon gsapPop" icon="arrow" :color1="getIconColor1" :color2="getIconColor2" :color3="getIconColor3"></svg-icon>
            <span class="text"> {{ sessionConfig.overview.text }}</span>
          </button>
        </li>

        <li :class="getItemClass(index)" v-for="(link, index) in pageLinks" :key="index">
          <button class="hide grow" @click="selectLink(link)">
            <svg-icon class="icon rotate gsapPop" icon="arrow" :color1="getIconColor1" :color2="getIconColor2" :color3="getIconColor3"></svg-icon>

            <span class="text"> {{ link.text }}</span>
          </button>
        </li>

      </ul>

    </div>

    <nav>
        <router-link :to="{ name: 'home' }">
          <svg-icon class="icon" icon="home" :color1="getIconColor1" :color2="getIconColor2" :color3="getIconColor1"></svg-icon>
          <span class="text">Home</span>
        </router-link>
    </nav>

    <pop-up-view v-if="selectedLink.text !== ''" :link="selectedLink" :backgroundColor="page.backgroundColor" @close="closeLinkView()"></pop-up-view>

  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore, mapState } from "vuex";
import { key } from "@/store/store";
import HotspotPage from "@/models/HotspotPage";
import { gsap } from "gsap";
import SvgIcon from "./SvgIcon.vue";
import PopUpView from "./PopUpView.vue";
import SmallHotspotPageView from "./SmallHotspotPageView.vue";
import Link from "@/models/Link";

export default defineComponent({
  name: "HotspotPageView",
  components: {
    SvgIcon,
    PopUpView,
    SmallHotspotPageView
  },
  props: {
    pageName: String
  },
  data () {
    return {
      store: useStore(key),
      page: new HotspotPage(),
      selectedLink: new Link(),
      animsHaveRun: false,
      pageLinks: new Array<Link>(),
      linkMap: new Array<Array<string>>()
    };
  },
  computed: {
    ...mapState([
      "sessionConfig",
      "viewMode"
    ]),
    getIconColor1 (): string {
      // return Utils.lightenDarkenColor(this.page.backgroundColour, -50);
      return this.page.iconColor1;
    },
    getIconColor2 (): string {
      return this.page.iconColor2;
    },
    getIconColor3 (): string {
      // return this.page.iconColor3;
      return "rgba(255, 255, 255, 0.3)";
    }
  },
  async mounted () {
    this.page = this.sessionConfig.hotspotPages.find((x: HotspotPage) => x.name === this.pageName);
    // this.pageLinks = this.page.links.slice(0, 6);
    this.pageLinks = this.page.links;
    this.linkMap.push([]); // 0
    this.linkMap.push(["left side-5-3"]); // 1
    this.linkMap.push(["left side-5-3", "right side-5-3"]); // 2
    this.linkMap.push(["left side-5-2", "right side-5-3", "left side-5-3"]); // 3
    this.linkMap.push(["left side-5-2", "right side-5-2", "left side-5-3", "right side-5-3"]); // 4
    this.linkMap.push(["left side-5-2", "right side-5-2", "left side-5-3", "right side-5-3", "left side-5-4"]); // 5
    this.linkMap.push(["left side-5-2", "right side-5-2", "left side-5-3", "right side-5-3", "left side-5-4", "right side-5-4"]); // 6
    this.linkMap.push(["left side-5-1", "right side-5-1", "left side-5-2", "right side-5-2", "left side-5-3", "right side-5-3", "left side-5-4"]); // 7
    this.linkMap.push(["left side-5-1", "right side-5-1", "left side-5-2", "right side-5-2", "left side-5-3", "right side-5-3", "left side-5-4", "right side-5-4"]); // 8
    this.linkMap.push(["left side-5-1", "right side-5-1", "left side-5-2", "right side-5-2", "left side-5-3", "right side-5-3", "left side-5-4", "right side-5-4", "left side-5-5"]); // 9
    this.linkMap.push(["left side-5-1", "right side-5-1", "left side-5-2", "right side-5-2", "left side-5-3", "right side-5-3", "left side-5-4", "right side-5-4", "left side-5-5", "right side-5-5"]); // 10

    if (!this.page) {
      alert("No matching page found: " + this.pageName);
    }
  },
  // GSAP animation won't run on load in the mounted event so have had to put it in updated but add a flag to stop it repeating
  async updated () {
    this.playOpeningAnims();
  },
  methods: {
    playOpeningAnims () {
      if (this.animsHaveRun === false) {
        // create a collection of pointer icons, so we can animate them in the desired order,
        // i.e. anti-clockwise, down the left hand side first, then up the right hand side and finally the top (overview) button

        const tl = gsap.timeline({ paused: true, delay: 0.5 });

        const pinDuration = 0.06;
        const pinEase = "power1.inOut";

        let arr = document.querySelectorAll(".left > button > .gsapPop");

        for (let i = 0; i < arr.length; i++) {
          const e = arr[i];
          const eTL = gsap.timeline();
          eTL.set(e, { opacity: 1, scale: 0 });
          eTL.to(e, { scale: 1, ease: pinEase, duration: pinDuration });
          eTL.to(e, { scale: 3, ease: pinEase, duration: pinDuration });
          eTL.to(e, { scale: 1, ease: pinEase, duration: pinDuration });
          // sometimes a bug appears and the arrow isn't pointing the right way, if the user is hovering over it when it is animating it,
          // so setting a rotation value here resets it to the correct position at the end of the animation.
          eTL.to(e, { rotate: 270, ease: "none", duration: 0 });
          tl.add(eTL);
        }

        arr = document.querySelectorAll(".right > button > .gsapPop");

        for (let i = arr.length - 1; i >= 0; i--) {
          const e = arr[i];
          const eTL = gsap.timeline();
          eTL.set(e, { opacity: 1, scale: 0 });
          eTL.to(e, { scale: 1, ease: pinEase, duration: pinDuration });
          eTL.to(e, { scale: 3, ease: pinEase, duration: pinDuration });
          eTL.to(e, { scale: 1, ease: pinEase, duration: pinDuration });
          eTL.to(e, { rotate: 90, ease: "none", duration: 0 });
          tl.add(eTL);
        }

        arr = document.querySelectorAll(".top > button > .gsapPop");

        for (let i = 0; i < arr.length; i++) {
          const e = arr[i];
          const eTL = gsap.timeline();
          eTL.set(e, { opacity: 1, scale: 0 });
          eTL.to(e, { scale: 1, ease: pinEase, duration: pinDuration });
          eTL.to(e, { scale: 3, ease: pinEase, duration: pinDuration });
          eTL.to(e, { scale: 1, ease: pinEase, duration: pinDuration });
          tl.add(eTL);
        }

        tl.to(".circle-links .text", { opacity: 1, duration: 1.5 });

        tl.play();

        this.animsHaveRun = true;
      }
    },
    selectLink (link: Link) {
      this.selectedLink = link;
    },
    closeLinkView () {
      this.selectedLink = new Link();
    },
    getItemClass (index: number): string {
      // const linkPlacement = this.linkMap.get(this.pageLinks.length);
      const linkPlacement = this.linkMap[this.pageLinks.length];

      const className = linkPlacement[index];
      return className;
    }
  }
});
</script>
<style lang="scss">
  .page-image-container {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 22%;
    height: auto;
    margin: 0;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    padding: 0.5%;
    box-sizing: border-box;
  }

  .page-image {
    animation: popup 0.8s ease-in-out;
    animation-delay: 0s;
    animation-fill-mode: backwards;
  }

  li > button > .text {
    display: block;
    font-weight: bold;
    width: 22vw;
    font-size: 1em;
    animation: fade-in 1s 2.5s linear;
    animation-fill-mode: none;
    animation-fill-mode: backwards;
    text-align: left;
  }

  nav {
    position: absolute;
    top: 3%;
    right: 5%;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    .icon {
      margin: 0;
      width: 3vw;
      margin-bottom: 0.3em;
    }

    .text {
      color: #fff;
      font-weight: bold;

    }

  }

  .circle-links {
    margin: 0;
    padding-left: 0;
    list-style: none;

    > li {
      width: 25vw;
      width: 28vw;
      margin-left: -12.5vw;
      margin-left: -14vw;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      // pointer-events: none;

      .text {
        opacity: 0;
      }

      button {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        white-space: normal;
        text-align: left;
      }

      &.top {
        // transform: rotate(270deg) translate(20vw) rotate(-270deg);
        // height: 13.3vw;
        margin-top: -22vw;
        flex-direction: column-reverse;

        .text {
          text-align: center;
        }

        .icon {
          transform: rotate(0deg);
        }

        button {
          flex-flow: column-reverse nowrap;
          text-align: center;
          gap: 1em;
          .text {
            //position: relative;
            //top: -1vw;
          }
        }
      }

      &.left {
        button {
          flex-direction: row-reverse;
        }
      }

    }

  }

 .icon {
    display: flex;
    width: 5vw;
    justify-content: center;
    align-items: center;
    // cursor: pointer;
    // pointer-events: auto;
    margin: 0 5%;
  }

  .left, .right, .top {
    .icon {
      opacity: 0;
    }
  }

  .left {
    flex-direction: row-reverse;

    button {

      .text {
        //text-align: right;
      }
    }

    .rotate {
      transform: rotate(270deg);
    }

    &.side-5-1 {
        transform: rotate(228deg) translate(22vw) rotate(-228deg) translateX(-2vw);
      }

    &.side-5-2 {
      transform: rotate(202.5deg) translate(24vw) rotate(-202.5deg) translateX(-2vw);
    }

    &.side-5-3 {
      transform: rotate(180deg) translate(26vw) rotate(-180deg) translateX(-2vw);
    }

    &.side-5-4 {
      transform: rotate(157.5deg) translate(24vw) rotate(-157.5deg) translateX(-2vw);
    }

    &.side-5-5 {
      transform: rotate(132deg) translate(22vw) rotate(-132deg) translateX(-2vw);
    }

  }

  .right {

    button {
      .text {
        text-align: left;
      }
    }

    .rotate {
      transform: rotate(90deg);
    }

    &.side-5-1 {
        transform: rotate(312deg) translate(22vw) rotate(-312deg) translateX(2vw);
      }

    &.side-5-2 {
      transform: rotate(337.5deg) translate(24vw) rotate(-337.5deg) translateX(2vw);
    }

    &.side-5-3 {
      transform: rotate(360deg) translate(26vw) rotate(-360deg) translateX(2vw);
    }

    &.side-5-4 {
      transform: rotate(22.5deg) translate(24vw) rotate(-22.5deg) translateX(2vw);
    }

    &.side-5-5 {
      transform: rotate(48deg) translate(22vw) rotate(-48deg) translateX(2vw);
    }
  }

  .gsapPop {
    opacity: 0;
  }

  @keyframes popup {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

@media (max-width: 1180px) {
  nav .text, li > .text {
    font-size: 0.7em;
  }
}

</style>
