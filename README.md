# Frontend Sistema Kardex (React + Vite)

Este proyecto es una aplicación web desarrollada en React.js para consumir la API del sistema Kardex. Permite gestionar compras, ventas y visualizar movimientos de inventario.

--------------------------------------------
TECNOLOGIAS UTILIZADAS
--------------------------------------------
- React 18
- Vite
- Axios
- JavaScript ES6
- CSS básico

--------------------------------------------
REQUISITOS PREVIOS
--------------------------------------------
- Tener instalado Node.js versión 18 o superior
- Tener ejecutándose el backend .NET 8

--------------------------------------------
CONFIGURACION DEL PROYECTO
--------------------------------------------

1. Clonar el repositorio

git clone https://github.com/dimedonde/csf_frontend.git

2. Ingresar a la carpeta del proyecto

cd csf_frontend

3. Instalar dependencias

npm install

--------------------------------------------
CONFIGURACION DE API
--------------------------------------------

Editar el archivo:

src/interceptors/axios.js

Configurar la URL del backend:

baseURL: "http://localhost:5000/api"

--------------------------------------------
EJECUCION DEL PROYECTO
--------------------------------------------

1. Iniciar el proyecto en modo desarrollo

npm run dev

2. Abrir en el navegador:

http://localhost:5173

--------------------------------------------
AUTENTICACION JWT
--------------------------------------------

- El token se almacena en localStorage
- El token se envía automáticamente en cada request mediante interceptor Axios

--------------------------------------------
FUNCIONALIDADES DEL SISTEMA
--------------------------------------------

COMPRAS:
- Selección de productos
- Agregar múltiples productos al carrito
- Registro de compra
- Creación de nuevos productos (según backend)
- Actualización automática de stock, costo y precio venta

VENTAS:
- Listado de productos con stock disponible
- Validación de stock antes de registrar venta
- Cálculo automático de:
  - subtotal
  - igv (18%)
  - total
- Registro de movimiento tipo salida

KARDEX:
- Visualización de productos
- Stock actual
- Costo y precio de venta
- Historial de movimientos por producto

--------------------------------------------
ESTRUCTURA DEL PROYECTO
--------------------------------------------

src/
- api/
- components/
- interceptors/
- App.jsx
- main.jsx

--------------------------------------------
NOTAS IMPORTANTES
--------------------------------------------

- El backend debe estar ejecutándose antes de iniciar el frontend
- No subir node_modules al repositorio
- Mantener sincronización de la URL del backend entre entornos
