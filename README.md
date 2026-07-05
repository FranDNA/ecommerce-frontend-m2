# TiendAmbiente - E-commerce Frontend

Proyecto del Módulo 2: MVP frontend de una tienda ficticia de productos sustentables, hecho con HTML5 semántico, Bootstrap por CDN y JavaScript básico para simular el carrito de compras.

## Repositorio

https://github.com/FranDNA/ecommerce-frontend-m2

## Estructura

```text
ecommerce-frontend-m2/
|-- index.html
|-- producto.html
|-- carrito.html
|-- README.md
`-- assets/
    |-- css/
    |   `-- styles.css
    `-- js/
        `-- app.js
```

## Funcionalidades

- Home con grilla responsiva de productos.
- Cards generadas desde un arreglo de objetos en JavaScript.
- Página de detalle accesible con parámetro `?id=`.
- Botones "Agregar" que actualizan el contador del navbar.
- Carrito simulado con listado, totales y opción de vaciar.
- Persistencia simple con `localStorage`.
- Navbar, footer, contraste y estados de foco visibles.

## Ejecución

1. Abrir `index.html` en el navegador.
2. Revisar la navegación hacia `producto.html?id=1` y `carrito.html`.
3. Probar "Agregar al carrito" desde home y detalle.
4. Validar visualmente en ancho móvil cercano a 420 px y escritorio desde 1024 px.

No requiere instalación de dependencias, Bootstrap se carga por CDN.

## Historial de commits

```bash
git init
git add .
git commit -m "Estructura inicial del ecommerce frontend"
git commit -m "Implementa catálogo y detalle de productos"
git commit -m "Agrega carrito simulado y documentación"
```
