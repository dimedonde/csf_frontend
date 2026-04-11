import api from '../interceptors/axios'

export const registrarVenta = (data) => api.post('/venta', data)
