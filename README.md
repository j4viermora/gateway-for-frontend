# Reverse Proxy

## Requisitos

- Node.js

## Instalación

Gateway

```bash
cd gateway && npm install
```

Frontends

Vue Frontend

```bash
cd frontend-one && npm install
```

Svelte Frontend

```bash
cd frontend-two && npm install
```


## Consideraciones

Es necesario general el build de los frontends antes de ejecutar el gateway.

```bash
cd frontend-one && npm run build
cd frontend-two && npm run build
```

Se utiliza serve para levantar los frontends en modo producción.

```bash
cd frontend-one && serve --listen 3001 dist
cd frontend-two && serve --listen 3002 dist
```

Se utiliza el proxy de express para hacer el reverse proxy.

En el frontend two se cambia manual mente el path de los static assets, en el archivo index.html
y se crear una carpeta v2 y ahi dentro se mueven los assets. El path quedaria de las siguiente manera:

```html
  <script type="module" crossorigin src="/v2/assets/index-Qo-_QU8M.js"></script>
  <link rel="stylesheet" crossorigin href="/v2/assets/index-DDqFzPXY.css">
```

Con fines educativo funciona perfectamente, lo ideal seria que al hacer build ya se cree el nombre de la carpeta. O un mejor manejo de los assets desde el backend.

## Ejecución

```bash
cd gateway && npm run dev
```

Podremos ver los frontend desde el navegador http://localhost:3000