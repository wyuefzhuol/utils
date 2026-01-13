<script setup>
// import FishingFooter from "./assets/js/fishingFooter.js";
import {onMounted, ref} from "vue";

// const showFooter = ref(false)

onMounted(() => {
  console.log(` _____   _____    _   _____        _   _   _____   _   _       _____
| ____| |  _  \\  | | /  ___|      | | | | |_   _| | | | |     /  ___/
| |__   | |_| |  | | | |          | | | |   | |   | | | |     | |___
|  __|  |  _  /  | | | |          | | | |   | |   | | | |     \\___  \\
| |___  | | \\ \\  | | | |____      | |_| |   | |   | | | |___   ___| |
|_____| |_|  \\_\\ |_| \\_____|      \\_____/   |_|   |_| |_____| /_____/ `)
})
</script>

<template>
  <n-message-provider>
    <router-view></router-view>
<!--    <div id="fishingFooter" class="fixed bottom-0 w-full" style="z-index: 999" v-show="showFooter"></div>-->
<!--    <div style="position: fixed;bottom: 15px;z-index: 9999;right: 15px;border-radius: 30px;width: 50px;height: 50px;background: white;display: flex;align-items: center;justify-content: center;cursor: pointer" @click="showFooter = !showFooter">{{showFooter?'隐藏':'显示'}}</div>-->
  </n-message-provider>
</template>

<style scoped>
</style>
