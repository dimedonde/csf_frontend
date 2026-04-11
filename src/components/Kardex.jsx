import React, { useEffect, useState } from 'react'
import { getProductos } from '../api/productos'
import { getMovimientos } from '../api/movimientos'

export default function Kardex() {
  const [productos, setProductos] = useState([])
  const [movs, setMovs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
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

  const open = async (id) => {
    try {
      const res = await getMovimientos(id)
      setMovs(res.data)
    } catch (err) {
      console.error(err)
      alert('Error cargando movimientos')
    }
  }

  return (
    <div>
      <h2>Kardex</h2>

      {loading && <p>Cargando...</p>}

      {productos.map(p => (
        <div key={p.id_producto}>
          {p.nombre_producto} | Stock: {p.stock_actual}
          <button onClick={() => open(p.id_producto)}>Ver movimientos</button>
        </div>
      ))}

      <hr />

      {movs.map((m, i) => (
        <div key={i}>
          {new Date(m.fecha_registro).toLocaleString()} - {m.tipo_movimiento} - {m.cantidad}
        </div>
      ))}
    </div>
  )
}
