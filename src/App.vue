<script setup>
import FishingFooter from "./assets/js/fishingFooter.js";
import { onMounted } from "vue";

onMounted(() => {
  FishingFooter.init('fishingFooter')
})
</script>

<template>
  <n-message-provider>
    <router-view></router-view>
    <div id="fishingFooter" class="fixed bottom-0 w-full" style="z-index: 999"></div>
  </n-message-provider>
</template>

<style scoped>
</style>
