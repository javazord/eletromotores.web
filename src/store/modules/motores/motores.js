import MotorService from '../../../services/motores/motorService'

const state = {
    motores: [ ],
    motor: {
        email: '',
        senha: ''
    }
}

const getters = {
    allMotors: (state) => state.motores,
    motor: (state) => state.motor
}

const actions = {
    async getAll({ commit }) {
        const res = await MotorService.getAll()
        commit('setMotors', res.data)
    },
    selecionaUsuario({ commit }, id) {
        console.log(id);
        commit('setMotorById', id)
    }
}

const mutations = {
    setMotors: (state, value) => state.motores = value,
    setMotorById: (state, id) => {
        console.log(id);
        state.motor = state.motores.filter(u => u.id === id)[0]
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
