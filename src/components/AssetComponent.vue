<template>

  <div>
    <!-- draggable/editable asset -->
    <div v-if="editorEnabled === true"
          :id="asset.id"
          :style="getStyle()"
          class="asset-image drag-me"
          draggable="true"
          @dragstart="startDrag($event, asset)"
          @keydown.shift.exact="onKeyDownWithShift"
          @keydown.exact="onKeyDown"
          tabindex="0">
      <img
        :src="asset.src"
        :alt="asset.altText"
        draggable="false"
        >
    </div>

    <!-- hotspot asset -->
    <router-link v-else-if="asset.src && asset.src !== '' &&  asset.linkIdentifier && asset.linkIdentifier !== ''"
                  class="hotspot"
                  @keyup.enter="goToPage(asset.linkIdentifier)"
                  @keyup.space="goToPage(asset.linkIdentifier)"
                  :to="{ name: 'hotspotPage', params: { pageName: asset.linkIdentifier }}">

          <img :id="asset.id"
            class="asset-image grow"
            :class="{'editor-enabled': editorEnabled}"
            :style="getStyle()"
            :src="asset.src"
            :alt="asset.altText"
            draggable="false"
          >

    </router-link>

    <!-- non-hotspot asset -->
    <img v-else
        :id="asset.id"
        class="asset-image no-pointer-events"
        :style="getStyle()"
      :src="asset.src"
      :alt="asset.altText"
      draggable="false"
      >

  </div>
</template>

<script lang="ts">
import { useStore, mapState } from "vuex";
import { key } from "@/store/store";
import StageAsset from "@/models/StageAsset";
import router from "@/router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AssetComponent",
  emits: ["onMoveLeft", "onLargeMoveLeft", "onMoveRight", "onLargeMoveRight", "onMoveUp", "onLargeMoveUp", "onMoveDown", "onLargeMoveDown", "onPlus", "onMinus"],
  data () {
    return {
      store: useStore(key)
    };
  },
  computed: {
    ...mapState([
      "hotspotIndicatorsEnabled"
    ])
  },
  props: {
    editorEnabled: {
      type: Boolean,
      required: true
    },
    indicatorColour: {
      type: String,
      required: true
    },
    asset: {
      type: StageAsset,
      default: new StageAsset()
    }
  },
  methods: {
    goToPage (assetLinkIdentifier: string) {
      router.push({ name: "hotspotPage", params: { pageName: assetLinkIdentifier } });
    },
    onArrowLeft () {
      this.$emit("onMoveLeft");
    },
    onArrowRight () {
      this.$emit("onMoveRight");
    },
    onArrowUp () {
      this.$emit("onMoveUp");
    },
    onArrowDown () {
      this.$emit("onMoveDown");
    },
    onKeyDownWithShift (e: KeyboardEvent) {
      switch (e.key) {
        case "+":
          this.$emit("onPlus");
          break;
        case "-":
          this.$emit("onMinus");
          break;
        case "ArrowLeft":
          this.$emit("onLargeMoveLeft");
          break;
        case "ArrowRight":
          this.$emit("onLargeMoveRight");
          break;
        case "ArrowUp":
          this.$emit("onLargeMoveUp");
          break;
        case "ArrowDown":
          this.$emit("onLargeMoveDown");
          break;

        default:
          break;
      }
    },
    onKeyDown (e: KeyboardEvent) {
      switch (e.key) {
        case "+":
          this.$emit("onPlus");
          break;
        case "-":
          this.$emit("onMinus");
          break;
        case "ArrowLeft":
          this.$emit("onMoveLeft");
          break;
        case "ArrowRight":
          this.$emit("onMoveRight");
          break;
        case "ArrowDown":
          this.$emit("onMoveDown");
          break;
        case "ArrowUp":
          this.$emit("onMoveUp");
          break;
        default:
          break;
      }
    },
    getIconColor (color: number) {
      switch (color) {
        case 2:
          return "#fff";
        default:
          return "#000";
      }
    },
    getStyle () {
      // outline: $keyboard-focus-width $keyboard-focus-style $keyboard-focus-color;
      const s = { borderColor: "transparent", width: this.asset.width, zIndex: this.asset.z, left: this.asset.left, top: this.asset.top };
      if (this.asset.linkIdentifier && this.asset.linkIdentifier !== "") {
        if (this.hotspotIndicatorsEnabled || this.editorEnabled) {
          if (this.editorEnabled) {
            s.borderColor = "#ff0000";
          } else {
            s.borderColor = this.indicatorColour;
          }
        }
      }

      return s;
    },
    startDrag (evt: any, asset: StageAsset) {
      if (evt !== null && evt.dataTransfer !== null) {
        // evt.dataTransfer.dropEffect = "move";
        // evt.dataTransfer.effectAllowed = "move";
        evt.dataTransfer.setData("assetId", asset.id);
        evt.dataTransfer.setData("assetZ", asset.z);
        evt.dataTransfer.setDragImage(evt.target, evt.target.width / 2, evt.target.height / 2);
        asset.z = 9999;
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.stage-background, .asset-image {
    position: absolute;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .asset-image {

    border: dashed 2px transparent;

    .draggable {
      border: 1px solid transparent;
    }

  }

  .drag-me {
    cursor: move;
  }

  .no-pointer-events {
    pointer-events: none;
  }

</style>
