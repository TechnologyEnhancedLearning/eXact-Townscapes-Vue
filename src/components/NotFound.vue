<template>

  <h1>Oops!  Something unexpected happened.</h1>

  <p>We don't recognise the page you are trying to reach.</p>

  <div>

    <router-link :to="{ name: 'home' }">
      Go back to home page.
    </router-link>

  </div>
</template>

<script lang="ts">
import Log from "@/Log";
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFound",
  components: {},
  methods: {}
});
</script>
<style lang="scss">
a {
  color: blue;
  text-decoration: underline;
}
</style>
