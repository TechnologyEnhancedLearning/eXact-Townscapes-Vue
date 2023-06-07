<template>
  <small-view :class="{ 'display': viewMode === 'smallOnly', 'editor-on': sessionConfig.editorOn === true }">
  </small-view>
  <div id="containerWrapper" :class="{ 'display-none': viewMode !== 'normal', 'editor-on': sessionConfig.editorOn === true  }" >

    <div class="stage-control-panel">
      <button v-if="!sessionConfig.editorOn" @click="setSimpleViewMode()" class="hide controlBtn">
        <span class="sr-only">Switch to accessible view</span>
        <span class=""
              aria-hidden="true"
              >Accessible view
              </span>
      </button>
      <button @click="stopStartAnimations()" class="controlBtn hide">
        <span class="sr-only">Toggle animations on and off</span>
        <span v-if="animationsExist && animationsEnabled === true"
                aria-hidden="true"
                >Stop animations
                </span>

        <span v-if="animationsExist && animationsEnabled === false"
                aria-hidden="true"
                >Start animations
                </span>
      </button>

      <button v-if="!sessionConfig.editorOn"
              @click="toggleHotspotIndicator()"
              class="hide controlBtn">
        <span class="sr-only">Toggle hotspot indicator on and off</span>
        <span v-if="hotspotIndicatorsEnabled === true"
                aria-hidden="true"
                >Hide selectable areas
                </span>

        <span v-if="hotspotIndicatorsEnabled === false"
                aria-hidden="true"
                >Show selectable areas
                </span>
      </button>

      <button
            class="hide controlBtn"
            v-if="sessionConfig.info"
            @click="setVisibleModal('information')">
            {{ sessionConfig.info.title}}
      </button>

      <button v-if="!sessionConfig.editorOn" @click="setSimpleViewMode()" class="hide svg-btn">
        <span class="sr-only">Switch to accessible view</span>
        <svg-icon class=""
              icon="accessiblityOn"
              aria-hidden="true"
              :color1="sessionConfig.stage.scrollButtonColour">
              </svg-icon>
      </button>

      <button style="padding: 0.5em" v-if="sessionConfig.editorOn === true" @click="setVisibleModal('assetData')">Show Asset Info</button>
      <div v-if="sessionConfig.editorOn === true" class="xy-position">{{xPos}}%, {{yPos}}%
      </div>
    </div>

    <div id="container"
         :class="{ 'drag-zone': sessionConfig.editorOn === true }"
         :style="{ width: sessionConfig.stage.width, height: sessionConfig.stage.height, backgroundColor: sessionConfig.stage.backgroundColor }">
      <p class="sr-only">{{ sessionConfig.title }}</p>

      <!-- background -->
      <div v-if="sessionConfig.stageBackground && sessionConfig.stageBackground.id !== ''"
              :id="sessionConfig.stageBackground.id"
              class="stage-background"
              @mousemove="mousemove"
              @drop="onDrop($event)"
              @dragover.prevent
              @dragenter.prevent
              :style="getStyle(sessionConfig.stageBackground)">
          <img
            :src="sessionConfig.stageBackground.src"
            :alt="sessionConfig.stageBackground.altText"
            draggable="false"
            >
      </div>

      <!-- assets -->
      <template v-for="a in sessionConfig.assets" :key="a.id">
        <asset-component v-if="!a.disabled"
                         @on-move-left="onMoveLeft(a, smallMoveValue)"
                         @on-large-move-left="onMoveLeft(a, largeMoveValue)"
                         @on-move-right="onMoveRight(a, smallMoveValue)"
                         @on-large-move-right="onMoveRight(a, largeMoveValue)"
                         @on-move-up="onMoveUp(a, smallMoveValue)"
                         @on-large-move-up="onMoveUp(a, largeMoveValue)"
                         @on-move-down="onMoveDown(a, smallMoveValue)"
                         @on-large-move-down="onMoveDown(a, largeMoveValue)"
                         @on-minus="onDecreaseSize(a)"
                         @on-plus="onIncreaseSize(a)"
                         :asset="(a as StageAsset)"
                         :editor-enabled="sessionConfig.editorOn"
                         :indicator-colour="sessionConfig.stage.hotSpotIndicatorColour">
        </asset-component>
      </template>

    </div>
    <div v-if="sessionConfig.stage.scrollButtonsEnabled">

      <button id="scrollButtonLeft" class="hide scroll-button rotate" @click="scrollStageLeft()" >
        <span class="sr-only">Scroll stage to the left</span>
        <svg-icon
                  aria-hidden="true"
                  class="rotate"
                  icon="scrollArrow"
                  :color1="sessionConfig.stage.scrollButtonStrokeColour"
                  :color2="sessionConfig.stage.scrollButtonColour">
        </svg-icon>
      </button>
      <button id="scrollButtonRight" class="hide scroll-button" @click="scrollStageRight()" >
        <span class="sr-only">Scroll stage to the right</span>
        <svg-icon
                  aria-hidden="true"
                  icon="scrollArrow"
                  :color1="sessionConfig.stage.scrollButtonStrokeColour"
                  :color2="sessionConfig.stage.scrollButtonColour">
        </svg-icon>
      </button>

    </div>
    <footer :style="{ backgroundColor: sessionConfig.stage.footerColor, height: sessionConfig.stage.footerHeight }"></footer>
  </div>

  <transition name="slide">
    <modal-view v-if="visibleModal == 'assetData'" @close="setVisibleModal('')">
      <template v-slot:header>
        Asset Information
      </template>

      <template v-slot:body>
        <p>Here are the details for all the assets on the stage. <button @click="copyToClipboard()">Copy all to clipboard</button></p>
        <table id="assetData">
          <thead>
            <tr>
              <th>Name</th>
              <th>Left</th>
              <th>Top</th>
              <th>Scale</th>
              <th>Z-Index</th>
              <th>Background Colour</th>
              <th>Hotspot Page</th>
              <th>Timeline?</th>
              <th>Copy Geometry</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="a in sessionConfig.assets" :key="a">
              <td>{{ a.name }}</td>
              <td>{{ a.left }}</td>
              <td>{{ a.top }}</td>
              <td>{{ a.width }}</td>
              <td>{{ a.z }}</td>
              <td>{{ a.backgroundColor }}</td>
              <td>{{ a.linkIdentifier }}</td>
              <td>{{ a.timeline.tweens.length > 0 ? "Yes" : "No" }}</td>
              <td><button @click="copyAssetGeometryToClipboard(a)">Copy</button></td>
            </tr>
          </tbody>
        </table>
      </template>
    </modal-view>
  </transition>

   <transition name="slide">
    <modal-view v-if="visibleModal == 'information'" @close="setVisibleModal('')">
      <template v-slot:header>
        <div>
        <h2>{{ sessionConfig.info.title }}</h2>
        </div>
      </template>

      <template v-slot:body>
        <div class="info-modal-contents">
       <span v-html= "sessionConfig.info.text"></span>
        </div>

      </template>
    </modal-view>
  </transition>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore, mapState } from "vuex";
import { key } from "@/store/store";
import ModalView from "@/components/ModalView.vue";
import AssetComponent from "@/components/AssetComponent.vue";
import StageAsset from "@/models/StageAsset";
import StageBackground from "@/models/StageBackground";
import StageTween from "@/models/StageTween";
import { gsap } from "gsap";
import SmallView from "./SmallView.vue";
import SvgIcon from "./SvgIcon.vue";
import Information from "@/models/Information";

export default defineComponent({
  name: "HomeView",
  components: {
    ModalView,
    AssetComponent,
    SmallView,
    SvgIcon
  },
  data () {
    return {
      store: useStore(key),
      animationsExist: false,
      xPos: "0",
      yPos: "0",
      timelines: new Array<gsap.core.Timeline>(),
      smallMoveValue: 0.1,
      largeMoveValue: 1
    };
  },
  computed: {
    ...mapState([
      "sessionConfig",
      "viewMode",
      "visibleModal",
      "animationsEnabled",
      "hotspotIndicatorsEnabled",
      "stageLeftPosition"
    ])
  },
  async mounted () {
    await this.getViewModeCookie(); // determine stored view mode

    // create animations
    this.sessionConfig.assets.forEach((a: StageAsset) => {
      if (a.timeline.tweens.length > 0) {
        this.animationsExist = true;
        const tl = gsap.timeline({ paused: true });
        const element = document.getElementById(a.id);

        if (element !== null) {
          tl.repeat(parseInt(a.timeline.repeat.toString(), 10));

          tl.yoyo(a.timeline.yoyo);

          if (a.timeline.repeatDelay > 0) {
            tl.repeatDelay(a.timeline.repeatDelay);
          }

          for (let index = 0; index < a.timeline.tweens.length; index++) {
            const tween = a.timeline.tweens[index] as StageTween;

            let ease = tween.ease;
            if (tween.ease !== "none" && tween.easeType !== "") {
              ease = tween.ease + "." + tween.easeType;
            }

            const anim = Object.fromEntries(tween.animatedProperties);
            anim.ease = ease;
            anim.duration = tween.duration;

            switch (tween.type) {
              case "to":
                tl.to(element, anim);
                break;
              case "from":
                tl.from(element, anim);
                break;
              default:
                throw new Error("Unable to create tween.  Unrecognised tween type: " + tween);
            }
          }
          this.animationsEnabled === true ? tl.play() : tl.pause();

          this.timelines.push(tl);
        }
      }
    });

    const e = document.getElementById("container");
    if (e && this.stageLeftPosition && this.stageLeftPosition !== "") {
      e.style.marginLeft = this.stageLeftPosition;
      const rightMostPosition = "-" + (parseInt(this.sessionConfig.stage.width, 10) - 100) + "%";
      if (this.stageLeftPosition === "0%") {
        gsap.set("#scrollButtonLeft", { display: "none", duration: 0 });
      // } else if ((parseInt(this.stageLeftPosition, 10) * -1) >= parseInt(this.sessionConfig.stage.width, 10)) {
      } else if (this.stageLeftPosition === rightMostPosition) {
        gsap.set("#scrollButtonRight", { display: "none", duration: 0 });
      }
    }
  },
  methods: {
    onMoveLeft (a: StageAsset, moveValue: number) {
      let position = 0.00;
      position = parseFloat(a.left) - moveValue;
      a.left = position.toFixed(2) + "%";
    },
    onMoveRight (a: StageAsset, moveValue: number) {
      let position = 0.00;
      position = parseFloat(a.left) + moveValue;
      a.left = position.toFixed(2) + "%";
    },
    onMoveUp (a: StageAsset, moveValue: number) {
      let position = 0.00;
      position = parseFloat(a.top) - moveValue;
      a.top = position.toFixed(2) + "%";
    },
    onMoveDown (a: StageAsset, moveValue: number) {
      let position = 0.00;
      position = parseFloat(a.top) + moveValue;
      a.top = position.toFixed(2) + "%";
    },
    onIncreaseSize (a: StageAsset) {
      let width = 0.00;
      if (a.width !== "auto") {
        width = parseFloat(a.width) + 0.1;
        a.width = width.toFixed(2) + "%";
      }
    },
    onDecreaseSize (a: StageAsset) {
      let width = 0.00;
      if (a.width !== "auto") {
        width = parseFloat(a.width) - 0.1;
        a.width = width.toFixed(2) + "%";
      }
    },
    setSimpleViewMode () {
      this.store.dispatch("setViewMode", "smallOnly");
    },
    toggleViewMode () {
      this.store.dispatch("toggleViewMode");
    },
    async getViewModeCookie () {
      const viewMode = document.cookie
        .split("; ")
        .find(row => row.startsWith("ViewMode="))
        ?.split("=")[1];

      if (viewMode === "normal" || viewMode === "smallOnly") {
        this.store.dispatch("setViewMode", viewMode);
      }
    },
    getIconColor1 (): string {
      // return Utils.lightenDarkenColor(this.page.backgroundColour, -50);
      return "#fff";
    },
    getIconColor2 (): string {
      return "#e7a715"; // e7a715
    },
    dispatchStagePos (leftPosition: string) {
      this.store.dispatch("setStageLeftPosition", leftPosition);
    },
    scrollStageLeft () {
      const e = document.getElementById("container");
      if (e !== null) {
        const tl = gsap.timeline();
        tl.eventCallback("onComplete", this.dispatchStagePos, ["0%"]);
        // myAnimation.eventCallback("onComplete", myFunction, ["param1","param2"]);
        tl.to(e, { marginLeft: "0", duration: 1, ease: "power1.in" });
        tl.to("#scrollButtonLeft", { opacity: 0, display: "none", duration: 0.3, ease: "power1.in" });
        tl.to("#scrollButtonRight", { opacity: 1, duration: 0.3, ease: "power1.in", display: "block" });
      }
    },
    scrollStageRight () {
      const e = document.getElementById("container");
      const marginLeftValue = "-" + (parseInt(this.sessionConfig.stage.width, 10) - 100) + "%";
      if (e !== null) {
        const tl = gsap.timeline();
        tl.eventCallback("onComplete", this.dispatchStagePos, [marginLeftValue]);
        tl.to(e, { marginLeft: marginLeftValue, duration: 1, ease: "power1.in" });
        tl.to("#scrollButtonRight", { opacity: 0, display: "none", duration: 0.3, ease: "power1.in" });
        tl.to("#scrollButtonLeft", { opacity: 1, duration: 0.3, ease: "power1.in", display: "block" });
      }
    },
    getStyle (asset: StageBackground) {
      const s = { width: asset.width, zIndex: asset.z, left: asset.left, top: asset.top };
      return s;
    },
    copyToClipboard () {
      let str = "Name, Left, Top, Scale, Z-index, Background colour, Hotspot page, Timeline";
      this.sessionConfig.assets.forEach((a: StageAsset) => {
        str = str + "\n" +
              a.name + ", " +
              a.left + ", " +
              a.top + ", " +
              a.width + ", " +
              a.z + ", " +
              a.backgroundColor;

        if (a.linkIdentifier && a.linkIdentifier !== null) {
          str = str + ", " + a.linkIdentifier;
        }
        else {
          str = str + ", ";
        }

        if (a.timeline && a.timeline.tweens.length > 0) {
          str = str + ", Yes";
        } else {
          str = str + ", No";
        }
      });

      navigator.clipboard.writeText(str);
    },
    copyAssetGeometryToClipboard (a: StageAsset) {
      const str = `${a.left}, ${a.top}, ${a.width}, ${a.z}`;

      navigator.clipboard.writeText(str);
    },
    async stopStartAnimations () {
      await this.store.dispatch("toggleAnimations");

      this.timelines.forEach((x: gsap.core.Timeline) => {
        if (this.animationsEnabled === false) {
          x.restart(); // reset timeline
          x.pause();
        } else {
          x.play();
        }
      });
    },
    async toggleHotspotIndicator () {
      await this.store.dispatch("toggleHotspotIndicators");
    },
    setVisibleModal (value: string): void {
      this.store.dispatch("setVisibleModal", value);
    },
    isDraggableAsset (asset: StageAsset) {
      if (asset.linkIdentifier !== "") {
        return true;
      }
      return false;
    },
    startDrag (evt: any, asset: StageAsset) {
      if (evt !== null && evt.dataTransfer !== null) {
        evt.dataTransfer.dropEffect = "move";
        evt.dataTransfer.effectAllowed = "move";
        evt.dataTransfer.setData("assetId", asset.id);
        evt.dataTransfer.setDragImage(evt.target, evt.target.width / 2, evt.target.height / 2);
      }
    },
    onDrop (evt: any) {
      if (evt !== null && evt.dataTransfer !== null) {
        const droppedAssetId = evt.dataTransfer.getData("assetId");
        const a: StageAsset = this.sessionConfig.assets.find((x:StageAsset) => x.id === droppedAssetId);
        if (a != null) {
          const y = (evt.clientY / evt.target.height) * 100;
          const x = (evt.clientX / evt.target.width) * 100;
          a.left = x.toFixed(2) + "%";
          a.top = y.toFixed(2) + "%";
        }
      }
    },
    mousemove (event: any) {
      event.stopPropagation();
      event.preventDefault();
      if (this.sessionConfig.editorOn === true) {
        const y = (event.clientY / event.target.height) * 100;
        const x = (event.clientX / event.target.width) * 100;

        this.xPos = x.toFixed(2);
        this.yPos = y.toFixed(2);
      }
    },
    getXPos () {
      const pos = Number(this.xPos) - 3;
      return pos.toString() + "%";
    },
    getYPos () {
      const pos = Number(this.yPos) - 5;
      return pos.toString() + "%";
    }
  }
});
</script>
<style lang="scss">

// 1024px
@media only screen and (min-width: 1024px) {

  #containerWrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;

  }

  #container {
    position: absolute;
    top: 0;
  }

  .xy-position {
    font-weight: bold;
    color: #fff;
    font-size: 1em;
    background-color: #17667ea9;
    border: solid 1px #000;
    padding: 0.4em;
    width: 140px;
  }

  .stage-background, .asset-image {
    position: absolute;

    img {
      height: 100%;
      width: 100%;
    }
  }

  #scrollButtonLeft {
    left: 0.5vw;
    &.rotate {
      transform: rotate(180deg);
    }

    svg {
      position: relative;
      top: 10px;
    }
  }

  #scrollButtonRight {
    right: 1%;

    svg {
      position: relative;
      top: 5px;
    }
  }

  .scroll-button {
    position: absolute;
    top: 50%;
    border: none;
    z-index: 3000;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center;
    // background-size: 100%;
    background-color: transparent;

    &:focus {
      svg {

      }
    }

    svg {
      outline: $keyboard-focus-width $keyboard-focus-style $keyboard-focus-color;

    }

  }

  .stage-control-panel {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 1em;
    margin: 1em;
    z-index: 9999;
    position: relative;

    .controlBtn {
      background-color:#fff;
      border-radius:5px;
      padding:1rem;
    }
  }

  .info-modal-contents a {
    text-decoration: underline;
  }

}

</style>
