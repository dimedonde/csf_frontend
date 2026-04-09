import api from '../interceptors/axios'

export const getProductos = () => api.get('/productos')
export const createProducto = (data) => api.post('/productos', data)
