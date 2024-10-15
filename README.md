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

Se utiliza serve para levantar los frontends en modo desarrollo.

```bash
cd frontend-one && npm run dev
cd frontend-two && npm run dev
```

## Ejecución

```bash
cd gateway && npm run dev
```

Podremos ver los frontend desde el navegador http://localhost:3000
