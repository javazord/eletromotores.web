import axios from "axios";

export default function createHttp() {
    const http = axios.create({
        baseURL: 'http://localhost:9000/eletromotores'
    })
    
    http.interceptors.request.use(config  => {
        const token = localStorage.getItem('elms_token')
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`
        }
        return config
    }
    );

    return http

}