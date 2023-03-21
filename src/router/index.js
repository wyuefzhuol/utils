import {createRouter, createWebHashHistory} from 'vue-router'
import Index from '../components/index.vue'
import Map from '../components/Map.vue'

const routes = [
  {
    path: '/utils',
    component: Index
  },
  {
    path: '/utils/map',
    component: Map
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
