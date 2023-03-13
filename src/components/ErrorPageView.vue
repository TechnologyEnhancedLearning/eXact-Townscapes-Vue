<template>

  <h1>Oops!  We are very sorry but something unexpected happened.</h1>

  <div>
    <router-link class="simpleLink" :to="{ name: 'home' }">
      Go back to home page.
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorPageView",
  components: {},
  methods: {}
});
</script>
<style lang="scss">
a.simpleLink {
  color: rgb(25, 25, 226);
  text-decoration: underline;
}
</style>
