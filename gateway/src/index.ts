// src/index.js
import express, { Express, Request, Response } from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const frontendOne = process.env.FRONTEND_ONE
const frontendTwo = process.env.FRONTEND_TWO

app.use(cors());

const vueProxy = createProxyMiddleware({
  target: frontendOne,
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
  target: frontendTwo,
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

app.get("/check", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/v2', svelteProxy);
app.use('/', vueProxy);

app.use((err:any, req: Request, res: Response, next: any) => {
    res.status(500).send('Algo salió mal!');
  });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});