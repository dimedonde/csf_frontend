import React, { useEffect, useState } from 'react'
import { getProductos } from '../api/productos'
import { registrarCompra } from '../api/compras'

export default function CompraForm() {
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
    await registrarCompra(carrito)
    setCarrito([])
  }

  return (
    <div>
      <h2>Compras</h2>

      {productos.map(p => (
        <div key={p.id_producto}>
          {p.nombre_producto}
          <button onClick={() => add(p)}>Agregar</button>
        </div>
      ))}

      <h3>Carrito</h3>
      {carrito.map((c,i)=>(
        <div key={i}>
          {c.nombre_producto}
          <input type='number'
            value={c.cantidad}
            onChange={(e)=>{
              const copy=[...carrito]
              copy[i].cantidad=parseInt(e.target.value)
              setCarrito(copy)
            }}
          />
        </div>
      ))}

      <button onClick={save}>Guardar Compra</button>
    </div>
  )
}
