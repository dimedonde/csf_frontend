import api from '../interceptors/axios'

export const login = (data) => api.post('/auth/login', data)
