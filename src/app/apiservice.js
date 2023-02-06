import axios from "axios";

const httpCliente = axios.create({
    baseURL: 'http://localhost:9000/eletromotores',
    withCredentials: true
})

class ApiService {

    constructor(apiUrl) {
        this.apiUrl = apiUrl;

    }

    static tokenRegister(token){
        if (token) {
            httpCliente.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
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
