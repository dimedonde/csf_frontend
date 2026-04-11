import React, { useEffect, useState } from 'react'
import { getProductos } from '../api/productos'
import { getMovimientos } from '../api/movimientos'

export default function Kardex() {
  const [productos, setProductos] = useState([])
  const [movs, setMovs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProductos()
  }, [])

  const loadProductos = async () => {
    setLoading(true)
    try {
      const res = await getProductos()
      setProductos(res.data)
    } catch (err) {
      console.error(err)
      alert('Error cargando productos')
    } finally {
      setLoading(false)
    }
  }

  const open = async () => {
    try {
      const res = await getMovimientos()
      setMovs(res.data)
    } catch (err) {
      console.error(err)
      alert('Error cargando kardex')
    }
  }

  return (
    <div>
      <h2>Kardex</h2>

      {loading && <p>Cargando...</p>}

      {/* LISTA DE PRODUCTOS */}
      {productos.map(p => (
        <div key={p.id_producto}>
          {p.nombre_producto} | Stock: {p.stock_actual}
        </div>
      ))}

      <hr />

      <button onClick={open}>Ver Kardex</button>

      <hr />

      {/* LISTA KÁRDEX */}
      {movs.map((m, i) => (
        <div key={i}>
          {m.Nombre_producto} | Stock: {m.StockActual} | Precio: S/{m.PrecioVenta}
        </div>
      ))}
    </div>
  )
}
