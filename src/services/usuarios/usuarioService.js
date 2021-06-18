import createHttp from '../axiosConfig'

class UsuarioService {

    getAll() {
        const http = createHttp()
        const res = http.get('/usuario')
        return res
    }

    resetarSenha(login, bodyData) {
        const http = createHttp()
        const res = http.put(`/usuario/${login}`, bodyData)
        return res
    }

    create(bodyData) {
        const http = createHttp()
        const res = http.post('/usuario', bodyData)
        return res
    }

}

export default new UsuarioService();