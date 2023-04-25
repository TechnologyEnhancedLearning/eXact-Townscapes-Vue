<template>
  <div id="smallLinkListView" class="sm-view display">
    <div class="breadcrumbs">
      <router-link :to="{ name: 'home' }">
          <span>Home</span>
        </router-link>
        <span class="breadcrumb-separator">\</span>
      <span>{{ sessionConfig.info.title }}</span>
    </div>
    <div class="sm-view-wrapper information-text">
      <span v-html="sessionConfig.info.text">
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore, mapState } from "vuex";
import { key } from "@/store/store";
import HotspotPage from "@/models/HotspotPage";

export default defineComponent({
  name: "InformationPage",
  props: {
    pName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      store: useStore(key),
      page: new HotspotPage()
    };
  },
  computed: {
    ...mapState([
      "sessionConfig",
      "viewMode"
    ]),
    nicePageName (): string {
      let strName = "";
      this.page.name.split("-").forEach(x => {
        if (strName === "" && x !== "") { // capitalise first letter
          strName = x[0].toUpperCase();
          strName = strName + x.slice(1);
        } else {
          strName = strName + " " + x;
        }
      });
      return strName;
    }
  },
  async mounted () {
    // get page
    this.page = this.sessionConfig.hotspotPages.find((x: HotspotPage) => x.name === this.pName);
  }
});
</script>

<style scoped lang="scss">
.sm-view-wrapper {
  margin: 1em 1em;
}
/*
::v-deep  a {
    text-decoration: underline;
}

.information-text {
  color: $txt-color;
}
*/

</style>
