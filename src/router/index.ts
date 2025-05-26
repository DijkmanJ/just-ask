import { createRouter, createWebHistory } from 'vue-router'
import MeetingRoom from '../components/MeetingRoom.vue'
import OAuthCallback from '../components/OAuthCallback.vue'
import ZoomTest from '../components/ZoomTest.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/test'
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
    },
    {
      path: '/test',
      name: 'test',
      component: ZoomTest
    }
  ]
})

export default router 