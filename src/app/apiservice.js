import axios from "axios";

const httpCliente = axios.create({
    baseURL: 'http://localhost:9000/eletromotores'
})

class ApiService {

    constructor(apiUrl) {
        this.apiUrl = apiUrl;

    }

    post(url, obj) {
        const request = `${this.apiUrl}${url}`
        return httpCliente.post(request, obj)
    }

    put(url, obj) {
        const request = `${this.apiUrl}${url}`
        return httpCliente.put(request, obj)
    }

    delete(url) {
        const request = `${this.apiUrl}${url}`
        return httpCliente.delete(request)
    }

    get(url) {
        const request = `${this.apiUrl}${url}`
        return httpCliente.get(request)
    }


}
export default ApiService
