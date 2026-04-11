import api from '../interceptors/axios'

export const getMovimientos = async () => {
  try {
    const res = await api.get('/kardex')
    return res
  } catch (error) {
    console.error('Error en getMovimientos:', error)
    throw error
  }
}
