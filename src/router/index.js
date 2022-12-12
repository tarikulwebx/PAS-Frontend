import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
import { getLastLoginSession } from '@/utils/auth'
import { showToastMessage } from "../utils/message";


Vue.use(VueRouter)

/* Router for modules */

// constantRoutes
export const constantRoutes = [

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    hidden: true,
  },
  {
    path: '/set-initial',
    component: () => import('@/views/set-initial.vue'),
    hidden: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    hidden: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/search-by-id',
    component: () => import('@/views/id-search.vue'),
    hidden: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/capture-ocr-image',
    component: () => import('@/views/capture.vue'),
    hidden: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/ocr-search-result',
    component: () => import('@/views/ocr-search-result.vue'),
    hidden: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/captured-images',
    component: () => import('@/views/captured-images.vue'),
    hidden: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/register-input',
    component: () => import('@/views/register-input.vue'),
    hidden: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/registration-complete',
    component: () => import('@/views/registration-complete.vue'),
    hidden: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/test',
    component: () => import('@/views/test.vue'),
    hidden: true,
    meta: { requiresAuth: true }
  },
  // {
  //   path: '/*',
  //   component: () => import('@/views/error-page/404.vue'),
  //   hidden: true,
  //   meta: { requiresAuth: true }
  // },  
];

// export const asyncRoutes = [
//   { path: '*', redirect: '/404', hidden: true },
// ];

const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  base: import.meta.env.MIX_LARAVUE_PATH,
  routes: constantRoutes,
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
} 

 // router middleware gaurd
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let today = new Date().toLocaleDateString('jp-JP');
    if (!store.state.user.token) {
      next({
        name: "login"
      });
    } else if (getLastLoginSession() && getLastLoginSession() !== today) {
        store.dispatch('user/resetToken').then(() => {
        store.dispatch('global/refreshGlobalStore');
        store.dispatch('customer/refreshCustomerStore');
          showToastMessage('ログアウトしました。再度ログインしてください。', "is-danger");
      })
      next({
        name: "login"
      });
    } else {
      next({});
    }
  } else {
    next({});
  }
});

export default router;
