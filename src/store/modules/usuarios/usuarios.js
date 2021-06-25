import UsuarioService from '../../../services/usuarios/usuarioService'

const state = {
    usuarios: [ ],
    usuario: {
        login: "",
        password: ""
    }
}

const getters = {
    allUsers: (state) => state.usuarios,
    usuario: (state) => state.usuario
}

const actions = {
    async getAll({ commit }) {
        const res = await UsuarioService.getAll()
        commit('setUsers', res.data)
    },
    selecionaUsuario({ commit }, id) {
        console.log(id);
        commit('setUserById', id)
    },
    newUser({ commit }) {
        console.log('novo');
        commit('setUser', {})
    },
    async create({ commit }, usuario) {

        const res = await UsuarioService.create(usuario)
        commit('addUser', res.data)
    }
}

const mutations = {
    setUsers: (state, value) => state.usuarios = value,
    setUserById: (state, id) => {
        console.log(id);
        state.usuario = state.usuarios.filter(u => u.id === id)[0]
    },
    setUser: (state, usuario) => state.usuario = usuario,
    addUser: (state, usuario) => state.usuarios.push(usuario)
}

export default {
    state,
    getters,
    actions,
    mutations
}
