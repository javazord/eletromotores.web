import FioService from '../../../services/fios/fioService'

const state = {
    fios: [ ],
    fio: {
    }
}

const getters = {
    allThread: (state) => state.fios,
    fio: (state) => state.fio
}

const actions = {
    async getAll({ commit }) {
        const res = await FioService.getAll()
        commit('setMotors', res.data)
    },
    selectUser({ commit }, id) {
        console.log(id);
        commit('setMotorById', id)
    },
    async create({ commit }, fio) {
        const res = await FioService.create(fio)
        commit('addThread', res.data)
    }
}

const mutations = {
    setThreads: (state, value) => state.fios = value,
    setMotorById: (state, id) => {
        state.motor = state.motores.filter(u => u.id === id)[0]
    },
    setThread: (state, fio) => state.fio = fio,
    addThread: (state, fio) => state.fios.push(fio)
}

export default {
    state,
    getters,
    actions,
    mutations
}
