import createHttp from "../axiosConfig";

class MotorService {

    getAll() {
        const http = createHttp()
        const res = http.get('/motor')
        return res
    }

    create(bodyData) {
        const http = createHttp()
        const res = http.post('/motor/', bodyData)
        return res
    }

}

export default new MotorService();