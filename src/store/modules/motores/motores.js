import MotorService from '../../../services/motores/motorService'

const state = {
    motores: [ ],
    motor: { 
        voltagens: [],
        amperagens: [ ],
        usuario: sessionStorage.getItem('login')
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
    selectMotor({ commit }, id) {
        console.log(id);
        commit('setMotorById', id)
    },
    async createMotor({ commit }, motor) {
        const res = await MotorService.create(motor)
        commit('addMotor', res.data)
    }
}

const mutations = {
    setMotors: (state, value) => state.motores = value,
    setMotorById: (state, id) => {
        state.motor = state.motores.filter(u => u.id === id)[0]
    },
    setUser: (state, motor) => state.motor = motor,
    addMotor: (state, motor) => state.motores.push(motor)
}

export default {
    state,
    getters,
    actions,
    mutations
}
