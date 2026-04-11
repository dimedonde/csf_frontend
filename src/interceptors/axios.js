import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5678/api'
})

// REQUEST
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// RESPONSE
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API ERROR:', error)

    if (error.response?.status === 401) {
      alert('No autorizado')
    } else {
      alert('Error en la API')
    }

    return Promise.reject(error)
  }
)

export default api
