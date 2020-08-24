import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router'

import store from '../store/index'

import Home from '../views/Home.vue'
import ProductList from '../product/ProductList.vue'
import AddProduct from '../product/AddProduct.vue'
import Signin from '../auth/Signin.vue'
import Signup from '../auth/Signup.vue'
import Confirm from '../auth/Confirm.vue'

Vue.use(VueRouter)

function checkAuth(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  if (store.state.auth.isAuthenticated) {
    next()
  } else {
    next('/signin')
  }
}

function authGuard(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  /* Check if the auth data is initialized (get auth data from local storage) to see
   * if the user is signed in previously or not.
   * NOTE that we do it here because auth guard is triggered before any component is loaded
   * unless we have a home/dashboard component which does not require the auth guard to be
   * triggered, which is not the case here. although, I put the auth init code in App
   * component too in order to make sure that it is called even if we remove the guard.
   */
  if (!store.state.authInitCompleted) {
    store.dispatch('initAuth').then(() => {
      // check auth after the initAuth is finished
      checkAuth(to, from, next);
    });
  } else
    checkAuth(to, from, next);
}

const routes: Array<RouteConfig> = [
  { path: '/', component: Home, beforeEnter: authGuard },
  { path: '/products', component: ProductList, beforeEnter: authGuard },
  { path: '/add-product', component: AddProduct, beforeEnter: authGuard },
  { path: '/signin', component: Signin },
  { path: '/signup', component: Signup },
  { path: '/confirm', component: Confirm },
  {
    path: '/about',    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: authGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
