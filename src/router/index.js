import { createRouter, createWebHistory } from 'vue-router'
import Motores from '../views/motores/Motores'
import Usuarios from '../views/usuarios/Usuarios'
import Login from '../views/login/Login'

const routes = [
  {
    path: '/motores',
    name: 'Motores',
    component: Motores
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('elms_token')

  if (!token && to.matched.some(record => record.name != 'Login')) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
