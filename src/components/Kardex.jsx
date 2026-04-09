import React, { useEffect, useState } from 'react'
import { getProductos } from '../api/productos'
import { getMovimientos } from '../api/movimientos'

export default function Kardex() {
  const [productos, setProductos] = useState([])
  const [movs, setMovs] = useState([])

  const load = async () => {
    const res = await getProductos()
    setProductos(res.data)
  }

  useEffect(() => { load() }, [])

  const open = async (id) => {
    const res = await getMovimientos(id)
    setMovs(res.data)
  }

  return (
    <div>
      <h2>Kardex</h2>

      {productos.map(p => (
        <div key={p.id_producto}>
          {p.nombre_producto} |
          Stock: {p.stock_actual}
          <button onClick={() => open(p.id_producto)}>Ver movimientos</button>
        </div>
      ))}

      <hr />

      {movs.map((m,i)=>(
        <div key={i}>
          {m.fecha_registro} - {m.tipo_movimiento} - {m.cantidad}
        </div>
      ))}
    </div>
  )
}
