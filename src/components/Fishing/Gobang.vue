<template>
  <div id="golangBox"></div>
</template>

<script setup>
import golang from '../../utils/fishing/gobang.js'
import { onMounted } from "vue";

onMounted(() => {
  golang.init()
})
</script>

<style scoped>
</style>
