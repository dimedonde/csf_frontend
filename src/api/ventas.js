import api from '../interceptors/axios'

export const registrarVenta = (data) => api.post('/ventas', data)
