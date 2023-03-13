<template>
  <div id="smallHotspotPageView" class="sm-view" >

      <div class="breadcrumbs">
        <router-link :to="{ name: 'home' }">
            <span>Home</span>
          </router-link>
          <span class="breadcrumb-separator">\</span>
          <span>{{ nicePageName }}</span>

      </div>
      <div class="sm-view-wrapper">
        <ul style="padding: 0;">
          <li>

            <svg-icon class="icon rotate90" icon="arrow" color1="#005EB8" color2="#fff" color3="#005EB8"></svg-icon>
            <router-link
                  tabindex="0"
                  :to="{ name: 'OverviewPage', params: { pName: page.name } }">
                  {{ sessionConfig.overview.text }}
            </router-link>

          </li>
          <li v-for="(link, index) in page.links" :key="index">
            <template v-if="link.links.length > 0">

              <div class="small-view-link">
                <svg-icon class="icon rotate90" icon="arrow" color1="#005EB8" color2="#fff" color3="#005EB8"></svg-icon>
                <router-link
                  tabindex="0"
                  :to="{ name: 'SmallLinkListView', params: { pageName: page.name, linkText: link.text }}">
                  {{ link.text }}
                </router-link>
              </div>
            </template>
            <template v-else>
              <svg-icon tab-index="-1" class="icon rotate90" icon="arrow" color1="#000;" color2="#fff" color3="#000"></svg-icon>
              <span v-if="link.links.length == 0" v-html="link.text"></span>
            </template>

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
import HotspotPage from "@/models/HotspotPage";

export default defineComponent({
  name: "SmallHotspotPageView",
  components: {
    SvgIcon
  },
  props: {
    page: {
      type: HotspotPage,
      required: true
    }
  },
  data () {
    return {
      store: useStore(key)
    };
  },
  computed: {
    ...mapState([
      "sessionConfig"
    ]),
    nicePageName () {
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
  methods: {
    getIconColor (color: number) {
      switch (color) {
        case 2:
          return "#fff";
        default:
          return "#000";
      }
    },
    goHome () {
      this.$router.push("/");
    }
  }
});
</script>

<style scoped lang="scss">
@media only screen and (max-width: 1024px) {

  .switch-view {
    display: none;
  }
}

ul {
  li {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

  }
}

</style>
