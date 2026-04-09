import api from '../interceptors/axios'

export const registrarCompra = (data) => api.post('/compras', data)
