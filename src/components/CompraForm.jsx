import React, { useEffect, useState } from 'react'
import { getProductos } from '../api/productos'
import { registrarCompra } from '../api/compras'

export default function CompraForm() {
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

  const save = async () => {
    try {
      await registrarCompra(carrito)
      setCarrito([])
      load()
      alert('Compra registrada')
    } catch (err) {
      console.error(err)
      alert('Error registrando compra')
    }
  }

  return (
    <div>
      <h2>Compras</h2>

      {loading && <p>Cargando...</p>}

      {productos.map(p => (
        <div key={p.id_producto}>
          {p.nombre_producto}
          <button onClick={() => add(p)}>Agregar</button>
        </div>
      ))}

      <h3>Carrito</h3>
      {carrito.map((c, i) => (
        <div key={i}>
          {c.nombre_producto}
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
        </div>
      ))}

      <button onClick={save}>Guardar Compra</button>
    </div>
  )
}
