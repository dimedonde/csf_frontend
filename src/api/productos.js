import api from '../interceptors/axios'

export const getProductos = async () => {
  try {
    const [prodRes, kardexRes] = await Promise.all([
      api.get('/producto'),
      api.get('/kardex')
    ])

    // Mapear stock por producto
    const kardexMap = {}
    kardexRes.data.forEach(k => {
      kardexMap[k.Id_producto] = k.StockActual
    })

    // Mapear estructura al frontend
    const data = prodRes.data.map(p => ({
      id_producto: p.Id_producto,
      nombre_producto: p.Nombre_producto,
      precio_venta: p.PrecioVenta,
      costo: p.Costo,
      stock_actual: kardexMap[p.Id_producto] ?? 0
    }))

    return { data }

  } catch (error) {
    console.error('Error en getProductos:', error)
    throw error
  }
}

export const createProducto = (data) => api.post('/producto', data)
