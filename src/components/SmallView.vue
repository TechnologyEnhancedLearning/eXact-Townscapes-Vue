<template>
  <div id="smallView" class="sm-view">
    <div class="breadcrumbs">
        <span>Home</span>
    </div>
    <div class="sm-view-wrapper">
      <div class="control-panel">
        <button class="switch-view" v-if="!sessionConfig.editorOn" @click="setDetailedViewMode()">
          <span class="sr-only">Switch to standard view</span>
          <span class="" aria-hidden="true">Standard view </span>
        </button>
        <button @click="$router.push('/page/information')">{{ sessionConfig.info.title }}</button>
      </div>
      <ul style="padding: 0;">


        <!-- hotspot assets only -->
        <li v-for="a in sessionConfig.assets.filter((x: any) => x.src && x.src.trim !== '' &&  x.linkIdentifier && x.linkIdentifier.trim !== '')" :key="a">

          <div class="small-view-link">
            <svg-icon class="icon" icon="pin" color1="#005EB8" color2="#fff" color3="#005EB8"></svg-icon>
            <router-link
              tabindex="0"
              :to="{ name: 'hotspotPage', params: { pageName: a.linkIdentifier }}">
              {{ a.name }}
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore, mapState } from "vuex";
import { key } from "@/store/store";
import SvgIcon from "./SvgIcon.vue";
import StageAsset from "@/models/StageAsset";

export default defineComponent({
  name: "SmallView",
  components: {
    SvgIcon
  },
  props: {},
  data () {
    return {
      store: useStore(key)
    };
  },
  computed: {
    ...mapState([
      "sessionConfig"
    ])
  },
  methods: {
    hotspotsAssets () {
      return this.sessionConfig.assets;
    },
    setDetailedViewMode () {
      this.store.dispatch("setViewMode", "normal");
    },
    getIconColor (color: number) {
      switch (color) {
        case 2:
          return "#fff";
        default:
          return "#000";
      }
    },
    createLink (a: StageAsset) {
      return `<a href='#/page/${a.linkIdentifier}'>${a.name}</a>`;
    }
  }
});
</script>

<style scoped lang="scss">

.control-panel {
  margin-top: 1em;
  button {
    border-radius:5px;
    padding:1rem;
    margin-right: 1rem;
    border:1px solid #333;
  }
}

@media only screen and (max-width: 1024px) {
  .switch-view {
    display: none;
  }
}

.switch-view {
  background-color: #E8EDEE;
  >div {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      gap: 1em;
      padding-top: 0.5em;
    }

}

#smallView {
  ::v-deep  a:focus {
    outline: $keyboard-focus-width $keyboard-focus-style $keyboard-focus-color;
  }
}

</style>
