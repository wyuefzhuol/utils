<template>
  <div id="map" class="w-screen h-screen"></div>
</template>

<script setup>
import L from 'leaflet'
import Wkt from 'wicket/wicket-leaflet'
import 'leaflet.layerscontrol-minimap'
import '@geoman-io/leaflet-geoman-free'
import 'leaflet/dist/leaflet.css'
import 'leaflet.layerscontrol-minimap/control.layers.minimap.css'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import {onMounted} from 'vue'
import back from "../utils/map/L.back.js"
import dataDrawer from "../utils/map/L.dataDrawer.js"
import { uuid } from "../utils/dataUtils.js"
const wkt = new Wkt.Wkt()

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

  // Back Control
  back().addTo(map)

  // Zoom Control
  L.control.zoom().addTo(map)

  // Data Drawer Control
  const drawer = dataDrawer()
  drawer.addTo(map)

  // Paint Control
  map.pm.addControls({
    position: 'topleft',
    dragMode: false,
    cutPolygon: false,
    removalMode: false,
    rotateMode: false
  })
  map.on('pm:create', (e) => {
    if (!map.options.dataLayers) {
      map.options.dataLayers = {}
    }
    e.layer.on('pm:update', (e) => {
      updateGraphEvent(map, e.layer, drawer, e.layer.options.id)
    })
    updateGraphEvent(map, e.layer, drawer)
  })

  // Minimap Control
  L.control.layers.minimap(mapLayer, {}, {
    position: 'bottomright',
    collapsed: false,
    autoZIndex: false
  }).addTo(map)
}

const updateGraphEvent = (map, layer, drawer, existID = null) => {
  try {
    const wktStr = wkt.fromObject(layer).write()
    refreshDataList(map, wktStr, layer, drawer, existID)
  } catch (exception) {
    const wktStr = `CIRCLE [${layer._latlng.lat}, ${layer._latlng.lng}] ${layer._radius}`
    refreshDataList(map, wktStr, layer, drawer, existID)
  }
}

const refreshDataList = (map, wktStr, layer, drawer, existID = null) => {
  const id = existID || uuid()
  layer.options.id = id
  map.options.dataLayers[id] = {
    label: wktStr.substr(0, 40) + '...',
    graph: layer,
    raw: wktStr
  }
  drawer.refreshDataList(map)
}

onMounted(() => {
  initMap()
})
</script>

<style scoped>
</style>
