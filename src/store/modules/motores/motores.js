import MotorService from '../../../services/motores/motorService'

const state = {
    motores: [ ],
    motor: {
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
    selectUser({ commit }, id) {
        console.log(id);
        commit('setMotorById', id)
    },
    async create({ commit }, motor, voltagens, amperagens, user) {
        const res = await MotorService.create(motor, voltagens, amperagens, user)
        commit('addMotor', res.data)
    }
}

const mutations = {
    setMotors: (state, value) => state.motores = value,
    setMotorById: (state, id) => {
        state.motor = state.motores.filter(u => u.id === id)[0]
    },
    setUser: (state, usuario) => state.usuario = usuario,
    addMotor: (state, motor) => state.motores.push(motor)
}

export default {
    state,
    getters,
    actions,
    mutations
}
