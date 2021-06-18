import { createRouter, createWebHistory } from 'vue-router'
import Motores from '../views/motores/Motores'
import Usuarios from '../views/usuarios/Usuarios'
import Login from '../views/login/Login'
import NovoMotor from '../views/motores/NovoMotor'
import NovoUsuario from '../views/usuarios/NovoUsuario'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login', 
    name: 'Login',
    component: Login
  },
  {
    path: '/motores',
    name: 'Motores',
    component: Motores
  },
  {
    path: '/motores/novo',
    name: 'NovoMotor',
    component: NovoMotor
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios
  },
  {
    path: '/usuarios/novo',
    name: 'NovoUsuario',
    component: NovoUsuario
  }
  
]

const router = createRouter({
  history: createWebHistory(),  routes
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
