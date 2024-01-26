import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import mongoose from "mongoose";
import authRouter from "../modules/auth/auth.router";
import cartRouter from "../modules/cart/cart.router";
import orderRouter from "../modules/order/order.router";
import RootRouter from "../modules/root/root.router";
import {
  invalidPathHandler,
  handleClientErrors,
  handleServerErrors,
} from "../utils/middlewares";

const app: Application = express();

app.use(cors());
app.use(
  express.json({
    type: ["json"],
  })
);
app.use(
  morgan(
    ":remote-addr  :method :url :status :res[content-length] - :response-time ms"
  )
);

app.use("/", RootRouter);
app.use("/api/auth", authRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("*", invalidPathHandler);

//error middlewares
app.use(handleClientErrors);
app.use(handleServerErrors);

mongoose.connect(process.env.DB_URL, {});

export default app;
