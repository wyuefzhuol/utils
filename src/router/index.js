import {createRouter, createWebHashHistory} from 'vue-router'
import Index from '../views/index.vue'
import Map from '../views/Map.vue'
import Json from '../views/Json.vue'
import Color from '../views/Color.vue'
import Fishing from '../views/Fishing.vue'

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
  },
  {
    path: '/color',
    component: Color
  },
  {
    path: '/fishing',
    component: Fishing
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
