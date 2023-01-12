<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { parsePublicAssetsPath } from "./utils";

import vueLogo from "./assets/vue.svg";
import viteLogo from "./assets/vite.svg";

const logos = {
  vue: parsePublicAssetsPath(vueLogo),
  vite: parsePublicAssetsPath(viteLogo)
};
</script>

<template>
  <div id="main-vue-app">
    <a href="https://vitejs.dev" target="_blank">
      <img :src="logos.vite" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img :src="logos.vue" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue => Madhu freaking ROCKSSS!!" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
