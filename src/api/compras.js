import api from '../interceptors/axios'

export const registrarCompra = (data) => api.post('/compra', data)
