import React, { useState, useEffect } from 'react'
import CompraForm from './components/CompraForm.jsx'
import VentaForm from './components/VentaForm.jsx'
import Kardex from './components/Kardex.jsx'
import { login } from './api/auth'

export default function App() {
  const [view, setView] = useState('kardex')
  const [isAuth, setIsAuth] = useState(false)

  // Verificar si ya hay token al iniciar
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuth(true)
    }
  }, [])

  const handleLogin = async () => {
    try {
      const res = await login({
        username: "21232f297a57a5a743894a0e4a801fc3",
        password: "25d55ad283aa400af464c76d713c07ad"
      })

      localStorage.setItem('token', res.data.token)
      setIsAuth(true)
      alert('Login exitoso')
    } catch (err) {
      console.error(err)
      alert('Error en login')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuth(false)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Kardex App</h1>

      {/* Login */}
      {!isAuth ? (
        <div>
          <h3>Login requerido</h3>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>

          <hr />

          {/* Navegacion */}
          <button onClick={() => setView('compras')}>Compras</button>
          <button onClick={() => setView('ventas')}>Ventas</button>
          <button onClick={() => setView('kardex')}>Kardex</button>

          <hr />

          {/* Vistas */}
          {view === 'compras' && <CompraForm />}
          {view === 'ventas' && <VentaForm />}
          {view === 'kardex' && <Kardex />}
        </>
      )}
    </div>
  )
}