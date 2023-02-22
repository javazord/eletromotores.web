import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL

const httpClient = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

class ApiService {

    constructor(apiUrl) {
        this.apiUrl = apiUrl;

    }

    static tokenRegister(token){
        if (token) {
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token.token}`
        }
    }

    post(url, obj) {
        const request = `${this.apiUrl}${url}`
        return httpClient.post(request, obj)
    }

    put(url, obj) {
        const request = `${this.apiUrl}${url}`
        return httpClient.put(request, obj)
    }

    delete(url) {
        const request = `${this.apiUrl}${url}`
        return httpClient.delete(request)
    }

    get(url) {
        const request = `${this.apiUrl}${url}`
        return httpClient.get(request)
    }


}
export default ApiService
