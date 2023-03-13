<template>
  <loading-screen v-if="loadingStatus == 'loading'"></loading-screen>
  <router-view  v-if="loadingStatus !== 'loading'"
        v-slot="{ Component }"
        :key="$route.fullPath">

    <component :is="Component" />

</router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore, mapState, mapGetters } from "vuex";
import { key } from "@/store/store";
import LoadingScreen from "./components/LoadingScreen.vue";
import Log from "./Log";
import router from "./router";

declare let loConfig: any;

export default defineComponent({
  name: "App",
  components: {
    LoadingScreen
  },
  props: {},
  data () {
    return {
      store: useStore(key)
    };
  },
  computed: {
    ...mapState([
      "sessionConfig",
      "loadingStatus"
    ])
  },
  async created () {
    try {
      await this.store.dispatch("configureSession", loConfig);
    } catch (e) {
      this.store.dispatch("setLoadingStatus", "loaded");
      Log.Error("Error loading configuration", e);
      router.push({ name: "errorPage" });
    }
  },
  methods: {}
});
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
