import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import mongoose from "mongoose";

import {
  invalidPathHandler,
  handleClientErrors,
  handleServerErrors,
} from "../utils/middlewares";
import {
  authRouter,
  cartRouter,
  productRouter,
  orderRouter,
  paymentRouter,
  profileRouter,
} from "../routes";
import environmentConfig from "./environment.config";

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

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/payments", paymentRouter);

app.use("*", invalidPathHandler);

//error middlewares
app.use(handleClientErrors);
app.use(handleServerErrors);

mongoose.set("strictQuery", true);
mongoose.connect(environmentConfig.DB_URL, {});

export default app;
