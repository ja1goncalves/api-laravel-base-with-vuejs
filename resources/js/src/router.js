/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth/authService'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          redirect: '/dashboard/analytics'
        },
        {
          path: '/dashboard/analytics',
          name: 'dashboard-analytics',
          component: () => import('./views/DashboardAnalytics.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/dashboard/ecommerce',
          name: 'dashboard-ecommerce',
          component: () => import('./views/DashboardECommerce.vue'),
          meta: {
            rule: 'admin'
          }
        },


        // =============================================================================
        // Application Routes
        // =============================================================================
        {
          path: '/apps/email',
          redirect: '/apps/email/inbox',
          name: 'email'
        },
        {
          path: '/apps/email/:filter',
          component: () => import('./views/apps/email/Email.vue'),
          meta: {
            rule: 'editor',
            parent: 'email',
            no_scroll: true
          }
        },
        {
          path: '/apps/calendar/vue-simple-calendar',
          name: 'calendar-simple-calendar',
          component: () => import('./views/apps/calendar/SimpleCalendar.vue'),
          meta: {
            rule: 'editor',
            no_scroll: true
          }
        },
        // USERS
        {
          path: '/apps/user/user-list',
          name: 'app-user-list',
          component: () => import('@/views/apps/user/user-list/UserList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'User' },
              { title: 'List', active: true }
            ],
            pageTitle: 'Listagem de Usuários',
            rule: 'public'
          }
        },
        {
            path: '/pages/register',
            name: 'page-register',
            component: () => import('@/views/pages/register/Register.vue'),
            meta: {
                breadcrumb: [
                    { title: 'Home', url: '/' },
                    { title: 'User' },
                    { title: 'Register', active: true }
                ],
                pageTitle: 'Registro de Usuário',
                rule: 'admin'
            }
        },
        {
          path: '/apps/user/user-view/:userId',
          name: 'app-user-view',
          component: () => import('@/views/apps/user/UserView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'User' },
              { title: 'View', active: true }
            ],
            pageTitle: 'Visão do Usuário',
            rule: 'admin'
          }
        },
        {
          path: '/apps/user/user-edit/:userId',
          name: 'app-user-edit',
          component: () => import('@/views/apps/user/user-edit/UserEdit.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'User' },
              { title: 'Edit', active: true }
            ],
            pageTitle: 'Edição de Usuário',
            rule: 'admin'
          }
        },
        // CATEGORIES
        {
          path: '/apps/categories/categories-list',
          name: 'app-categories-list',
          component: () => import('@/views/apps/categories/categories-list/CategoriesList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Categories' },
              { title: 'List', active: true }
            ],
            pageTitle: 'Listagem de Categorias',
            rule: 'public'
          }
        },
        // MODULES MANAGEMENT
        {
          path: '/apps/modules/modules-list',
          name: 'app-modules-list',
          component: () => import('@/views/apps/modules/ModulesList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Modules' },
              { title: 'List', active: true }
            ],
            pageTitle: 'Listagem de Módulos',
            rule: 'editor'
          }
        },
        {
          path: '/apps/modules/module-edit/:moduleId',
          name: 'app-module-edit',
          component: () => import('@/views/apps/modules/ModuleEdit.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Module' },
              { title: 'Edit', active: true }
            ],
            pageTitle: 'Edição de modulo',
            rule: 'admin'
          }
        },
        // =============================================================================
        // Pages Routes
        // =============================================================================
        {
          path: '/pages/profile',
          name: 'page-profile',
          component: () => import('@/views/pages/Profile.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Profile', active: true }
            ],
            pageTitle: 'Profile',
            rule: 'editor'
          }
        },
        {
          path: '/pages/user-settings',
          name: 'page-user-settings',
          component: () => import('@/views/pages/user-settings/UserSettings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'User Settings', active: true }
            ],
            pageTitle: 'Settings',
            rule: 'editor'
          }
        },
        {
          path: '/pages/faq',
          name: 'page-faq',
          component: () => import('@/views/pages/Faq.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'FAQ', active: true }
            ],
            pageTitle: 'FAQ',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base',
          name: 'page-knowledge-base',
          component: () => import('@/views/pages/KnowledgeBase.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', active: true }
            ],
            pageTitle: 'KnowledgeBase',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base/category',
          name: 'page-knowledge-base-category',
          component: () => import('@/views/pages/KnowledgeBaseCategory.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', active: true }
            ],
            parent: 'page-knowledge-base',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base/category/question',
          name: 'page-knowledge-base-category-question',
          component: () => import('@/views/pages/KnowledgeBaseCategoryQuestion.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', url: '/pages/knowledge-base/category' },
              { title: 'Question', active: true }
            ],
            parent: 'page-knowledge-base',
            rule: 'editor'
          }
        },
        {
          path: '/pages/search',
          name: 'page-search',
          component: () => import('@/views/pages/Search.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Search', active: true }
            ],
            pageTitle: 'Search',
            rule: 'editor'
          }
        },
        {
          path: '/pages/invoice',
          name: 'page-invoice',
          component: () => import('@/views/pages/Invoice.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Invoice', active: true }
            ],
            pageTitle: 'Invoice',
            rule: 'editor'
          }
        },
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/callback',
          name: 'auth-callback',
          component: () => import('@/views/Callback.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/lock-screen',
          name: 'page-lock-screen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/comingsoon',
          name: 'page-coming-soon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'editor'
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(() => {

      // get firebase current user
      // const firebaseCurrentUser = firebase.auth().currentUser

      // If auth required, check login. If login fails redirect to login page
      if (!auth.isAuthenticated()) {
          if (to.path !== '/pages/login') {
              router.push({ path: '/pages/login', query: { to: to.path } })
          }
      } else if (auth.isAuthenticated() && to.path === '/pages/login') {
          router.push({ path: '/' })
      }

      if (
          to.path === "/pages/login" ||
          to.path === "/pages/forgot-password" ||
          to.path === "/pages/error-404" ||
          to.path === "/pages/error-500" ||
          to.path === "/pages/register" ||
          to.path === "/callback" ||
          to.path === "/pages/comingsoon" ||
          (auth.isAuthenticated())
      ) {
          return next();
      }

      return next()
    // Specify the current path as the customState parameter, meaning it
    // will be returned to the application after auth
    // auth.login({ target: to.path });

  })

})

export default router
