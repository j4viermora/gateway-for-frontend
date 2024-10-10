// src/index.js
import express, { Express, Request, Response } from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());


const vueProxy = createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true,
  pathRewrite: {
    "^/": "",
  },
  on: {
    proxyRes: function (proxyRes: any, req: any, res: any) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  }
});
const svelteProxy = createProxyMiddleware({
  target: "http://localhost:3002",
  changeOrigin: true,
  pathRewrite: {
    "^/v2": "",
  },
  on: {
    proxyRes: function (proxyRes: any, req: any, res: any) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  }
});

const svelteAssetsProxy = createProxyMiddleware({
    target: "http://localhost:3002/v2/assets",
    changeOrigin: true,
    // pathRewrite: {
    //   "^/v2": "",
    // },
    on: {
      proxyRes: function (proxyRes: any, req: any, res: any) {
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      },
    }
});

// Rutas
app.use('/v2/assets', svelteAssetsProxy);
app.use('/v2', svelteProxy);
app.use('/', vueProxy);

app.use((err:any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
  });

app.get("/check", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});