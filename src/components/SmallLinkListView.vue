<template>
  <div id="smallLinkListView" :class="{ 'display': viewMode === 'smallOnly' }"  class="sm-view">

    <div class="breadcrumbs">
      <router-link :to="{ name: 'home' }">
        <span>Home</span>
      </router-link>
      <span class="breadcrumb-separator">\</span>
      <router-link :to="{ name: 'hotspotPage', params: { pageName: pageName }}">
        <span>{{ getPageName }}</span>
      </router-link>
      <span class="breadcrumb-separator">\</span>
      <span>{{ linkText }}</span>
    </div>
    <div class="sm-view-wrapper">
      <ul style="padding: 0;">

        <li v-for="(l, index) in link.links" :key="index">
          <div class="small-view-link">
            <svg-icon class="icon rotate90" icon="arrow" color1="#005EB8" color2="#fff" color3="#005EB8"></svg-icon>
            <span v-html="l.text"></span>
          </div>
            <ul class="accordion" style="background-color: transparent;">
                <li class="accordionLi" v-for="(accLink, index) in l.links" :key="index">
                  <span v-html="accLink.text"></span>
                </li>
            </ul>
        </li>

      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore, mapState } from "vuex";
import { key } from "@/store/store";
import Link from "@/models/Link";
import HotspotPage from "@/models/HotspotPage";
import SvgIcon from "./SvgIcon.vue";

export default defineComponent({
  name: "SmallLinkListView",
  components: {
    SvgIcon
  },
  props: {
    pageName: {
      type: String,
      required: true
    },
    linkText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      store: useStore(key),
      page: new HotspotPage(),
      link: new Link()
    };
  },
  computed: {
    ...mapState([
      "sessionConfig",
      "viewMode"
    ]),
    getPageName () {
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
    this.page = this.sessionConfig.hotspotPages.find((x: HotspotPage) => x.name === this.pageName);
    // get link inside page
    if (this.page) {
      const l = this.page.links.find((x: Link) => x.text === this.linkText);
      if (l) {
        this.link = l;
      }
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

ul.accordion {
  margin-left: 1.5em;
  list-style: disc inside;
  li {
    padding: 0.8em 0;

    .linkText {
       display: inline;
       padding: 0;
    }
  }
}
@media only screen and (max-width: 1024px) {

  .switch-view {
    display: none;
  }
}
</style>
