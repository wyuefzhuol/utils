<template>
  <div id="map" class="w-screen h-screen"></div>
</template>

<script setup>
import L from 'leaflet'
import 'leaflet.layerscontrol-minimap'
import 'leaflet/dist/leaflet.css'
import 'leaflet.layerscontrol-minimap/control.layers.minimap.css'
import {onMounted} from 'vue'
import back from "../utils/map/L.back.js";
import dataDrawer from "../utils/map/L.dataDrawer.js";

const initMap = () => {
  const mapLayer = {
    'Carto White Grey Map': L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }),
    'Carto Dark Map': L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    })
  }
  const map = L.map('map', {
    layers: [mapLayer["Carto White Grey Map"]],
    renderer: L.canvas(),
    zoomControl: false
  }).setView([0, 0], 2)
  back().addTo(map)
  L.control.zoom().addTo(map)
  dataDrawer().addTo(map)
  L.control.layers.minimap(mapLayer, {}, {
    position: 'bottomright',
    collapsed: false,
    autoZIndex: false
  }).addTo(map)
}

onMounted(() => {
  initMap()
})
</script>

<style scoped>
</style>
