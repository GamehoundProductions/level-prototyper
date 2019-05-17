import Vue from 'vue'
import App from '@/App'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/2deditor',
    },
    {
      path: '/:editor',
      name: 'editor',
      component: App
    },
  ],
  mode: 'history'
})
