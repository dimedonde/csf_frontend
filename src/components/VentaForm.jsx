import React, { useEffect, useState } from 'react'
import { getProductos } from '../api/productos'
import { registrarVenta } from '../api/ventas'

export default function VentaForm() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const res = await getProductos()
    setProductos(res.data)
  }

  const add = (p) => {
    setCarrito([...carrito, {...p, cantidad:1}])
  }

  const save = async () => {
    for (let c of carrito) {
      if (c.cantidad > c.stock_actual) {
        alert('Stock insuficiente')
        return
      }
    }
    await registrarVenta(carrito)
    setCarrito([])
  }

  const calc = (c) => {
    const sub = c.cantidad * c.precio_venta
    const igv = sub * 0.18
    return {sub, igv, total: sub+igv}
  }

  return (
    <div>
      <h2>Ventas</h2>

      {productos.map(p => (
        <div key={p.id_producto}>
          {p.nombre_producto} - S/{p.precio_venta}
          <button onClick={() => add(p)}>Agregar</button>
        </div>
      ))}

      <h3>Carrito</h3>
      {carrito.map((c,i)=>{
        const t = calc(c)
        return (
          <div key={i}>
            {c.nombre_producto} |
            Cant: <input type='number'
              value={c.cantidad}
              onChange={(e)=>{
                const copy=[...carrito]
                copy[i].cantidad=parseInt(e.target.value)
                setCarrito(copy)
              }}
            />
            | Total {t.total.toFixed(2)}
          </div>
        )
      })}

      <button onClick={save}>Guardar Venta</button>
    </div>
  )
}
