import { createStore } from 'vuex'
import usuarios from './modules/usuarios/usuarios'
import motores from './modules/motores/motores'
import fios from './modules/fios/fios'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    usuarios, motores, fios
  }
})
