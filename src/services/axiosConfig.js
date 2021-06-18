import axios from "axios"
import { useRouter } from "vue-router"

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
    })

    http.interceptors.request.use(config  => {
        const login = sessionStorage.getItem('login')
        if (login) {
            config.headers.common['Authentication'] = `${login}`
        }
        return config
    })

    const router = useRouter()

    http.interceptors.response.use((response) => {
        return response
    }, (error) =>{
        const res = error.response

        if (res) {
            if (res.status === 401) {
                router.push('/login')
            }
            if (res.status === 403) {
                router.push('/motores')
            }
            if (res.data) {
                return Promise.reject(res.data)
            }
        }

        return Promise.reject(error.message)
    })

    return http

}