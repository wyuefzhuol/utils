import {createRouter, createWebHashHistory} from 'vue-router'
import Index from '../components/index.vue'
import Map from '../components/Map.vue'
import Json from '../components/Json.vue'

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/map',
    component: Map
  },
  {
    path: '/json',
    component: Json
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
