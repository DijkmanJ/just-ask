import { createRouter, createWebHistory } from 'vue-router'
import MeetingRoom from '../components/MeetingRoom.vue'
import OAuthCallback from '../components/OAuthCallback.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/meeting'
    },
    {
      path: '/meeting',
      name: 'meeting',
      component: MeetingRoom
    },
    {
      path: '/oauth/callback',
      name: 'oauth-callback',
      component: OAuthCallback
    }
  ]
})

export default router 