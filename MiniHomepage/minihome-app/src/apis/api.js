import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: '/api',
})

// Request 인터셉터
api.interceptors.request.use(
    (config) => {
        const jwt = Cookies.get('jwt')
        if ( jwt ) {
            config.headers.Authorization = `Bearer ${jwt}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response 인터셉터
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if ( error.response && error.response.status === 401 ) {
            Cookies.remove('jwt')
            if( window.location.pathname !== '/login' ) {
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default api