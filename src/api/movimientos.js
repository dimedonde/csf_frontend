import api from '../interceptors/axios'

export const getMovimientos = (id) => api.get(`/movimientos/${id}`)
