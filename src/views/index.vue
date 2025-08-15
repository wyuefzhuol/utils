<template>
  <div class="m-6 grid justify-items-center">
    <img src="/logo.svg" class="logo inline-block" alt="Eric`s Utils" />
    <div class="font-bold text-lg">Eric`s Utils</div>
  </div>
  <div class="lg:w-6/12 w-full p-6 m-center">
    <n-card size="small">
      <n-scrollbar style="max-height: calc(100vh - 280px);padding: 15px" trigger="none">
        <n-grid x-gap="15" y-gap="15" :cols="4" item-responsive responsive="screen" class="utils-box">
          <n-gi span="4 s:2 l:1" v-for="util in utils">
            <router-link :to="util.path">
              <n-card class="cursor-pointer utils-item">
                  <template #cover>
                    <img :src="util.image" class="object-cover h-48">
                  </template>
                  <div class="text-center mt-3 font-bold">{{util.title}}</div>
                  <n-ellipsis :line-clamp="1" class="mt-3 text-xs opacity-50">{{util.description}}</n-ellipsis>
              </n-card>
            </router-link>
          </n-gi>
        </n-grid>
      </n-scrollbar>
    </n-card>
  </div>
</template>

<script setup>
import MapUtilsImage from '../assets/mapUtils.jpg'
import JSONUtilsImage from '../assets/jsonUtils.png'
import ColorUtilsImage from '../assets/colorUtils.jpeg'
import FishingUtilsImage from '../assets/fishingUtils.jpeg'
import UUIDUtilsImage from '../assets/UUID.png'
import {ref} from 'vue'

const utils = ref([
  {
    title: 'Map Utils',
    image: MapUtilsImage,
    description: '包括WKT工具、画图工具',
    path: 'map'
  },
  {
    title: 'JSON Utils',
    image: JSONUtilsImage,
    description: 'JSON format',
    path: 'json'
  },
  {
    title: 'Color Utils',
    image: ColorUtilsImage,
    description: '颜色工具',
    path: 'color'
  },
  {
    title: 'Fishing Utils',
    image: FishingUtilsImage,
    description: 'only 鱼',
    path: 'fishing'
  },
  {
    title: 'UUID Utils',
    image: UUIDUtilsImage,
    description: 'UUID 生成',
    path: 'uuid'
  }
])
</script>

<style scoped>
.logo {
  height: 8em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #93ede7);
}
.utils-item:hover img {
  @apply transition filter-none opacity-100 ease-in-out transform;
}
.utils-item img {
  @apply filter grayscale opacity-50;
}
</style>
