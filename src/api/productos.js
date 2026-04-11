import api from '../interceptors/axios'

export const getProductos = () => api.get('/producto')
export const createProducto = (data) => api.post('/producto', data)
