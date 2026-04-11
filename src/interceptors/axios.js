import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5678/api'
})

// 🔐 REQUEST: agrega token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    console.error('Error en request:', error)
    return Promise.reject(error)
  }
)

// 🚨 RESPONSE: manejo centralizado de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API ERROR:', error)

    const status = error.response?.status

    // 🔴 401 → sesión inválida o expirada
    if (status === 401) {
      alert('Sesión expirada, vuelve a iniciar sesión')

      // limpiar token
      localStorage.removeItem('token')

      // recargar aplicación para forzar login
      window.location.reload()
    } 
    // 🔴 otros errores controlados
    else if (status >= 400 && status < 500) {
      alert('Error en la solicitud')
    } 
    // 🔴 errores del servidor
    else if (status >= 500) {
      alert('Error del servidor')
    } 
    // 🔴 error sin respuesta (network, backend caído, CORS, etc.)
    else {
      alert('Error de conexión con la API')
    }

    return Promise.reject(error)
  }
)

export default api
