import React, { useEffect, useState } from 'react'
import { getProductos } from '../api/productos'
import { registrarVenta } from '../api/ventas'

export default function VentaForm() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
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

  const add = (p) => {
    const existe = carrito.find(x => x.id_producto === p.id_producto)

    if (existe) {
      setCarrito(carrito.map(x =>
        x.id_producto === p.id_producto
          ? { ...x, cantidad: x.cantidad + 1 }
          : x
      ))
    } else {
      setCarrito([...carrito, { ...p, cantidad: 1 }])
    }
  }

  const calc = (c) => {
    const sub = c.cantidad * c.precio_venta
    const igv = sub * 0.18
    return { sub, igv, total: sub + igv }
  }

  const save = async () => {
    for (let c of carrito) {
      if (c.cantidad > c.stock_actual) {
        alert('Stock insuficiente')
        return
      }
    }

    try {
      await registrarVenta(carrito)
      setCarrito([])
      load()
      alert('Venta registrada')
    } catch (err) {
      console.error(err)
      alert('Error registrando venta')
    }
  }

  return (
    <div>
      <h2>Ventas</h2>

      {loading && <p>Cargando...</p>}

      {productos.map(p => (
        <div key={p.id_producto}>
          {p.nombre_producto} - S/{p.precio_venta}
          <button onClick={() => add(p)}>Agregar</button>
        </div>
      ))}

      <h3>Carrito</h3>
      {carrito.map((c, i) => {
        const t = calc(c)
        return (
          <div key={i}>
            {c.nombre_producto} |
            Cant:
            <input
              type='number'
              value={c.cantidad}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0
                const copy = [...carrito]
                copy[i].cantidad = value
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
