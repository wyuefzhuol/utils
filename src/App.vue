<script setup>
import FishingFooter from "./assets/js/fishingFooter.js";
import { onMounted } from "vue";

const showFooter = ref(true)

onMounted(() => {
  FishingFooter.init('fishingFooter')
})
</script>

<template>
  <n-message-provider>
    <router-view></router-view>
    <div id="fishingFooter" class="fixed bottom-0 w-full" style="z-index: 999" v-show="showFooter"></div>
    <div style="position: fixed;bottom: 15px;z-index: 9999;right: 15px;border-radius: 30px;width: 50px;height: 50px;background: white;display: flex;align-items: center;justify-content: center;cursor: pointer" @click="showFooter = !showFooter">{{showFooter?'隐藏':'显示'}}</div>
  </n-message-provider>
</template>

<style scoped>
</style>
