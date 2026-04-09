import React, { useState } from 'react'
import CompraForm from './components/CompraForm.jsx'
import VentaForm from './components/VentaForm.jsx'
import Kardex from './components/Kardex.jsx'

export default function App() {
  const [view, setView] = useState('kardex')

  return (
    <div style={{ padding: 20 }}>
      <h1>Kardex App</h1>

      <button onClick={() => setView('compras')}>Compras</button>
      <button onClick={() => setView('ventas')}>Ventas</button>
      <button onClick={() => setView('kardex')}>Kardex</button>

      <hr />

      {view === 'compras' && <CompraForm />}
      {view === 'ventas' && <VentaForm />}
      {view === 'kardex' && <Kardex />}
    </div>
  )
}
