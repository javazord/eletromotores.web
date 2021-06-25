import createHttp from "../axiosConfig";

class FioService {

    getAll() {
        const http = createHttp()
        const res = http.get('/fio')
        return res
    }

    create(bodyData) {
        const http = createHttp()
        const res = http.post('/fio', bodyData)
        return res
    }

}

export default new FioService();