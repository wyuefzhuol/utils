import { createApp } from 'vue'
import JsonViewer from "vue3-json-viewer"
import './utils/ColorSelector.js'
import './style.css'
import "vue3-json-viewer/dist/index.css"
import App from './App.vue'
import router from "./router/index.js"

createApp(App).use(router).use(JsonViewer).mount('#app')
