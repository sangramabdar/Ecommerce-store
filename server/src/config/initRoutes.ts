import { app } from "./initServer";
import RootRouter from "../modules/root/root.router";
import authRouter from "../modules/auth/auth.router";
import {
  handleClientError,
  handleError,
  invalidPageHandler,
  invalidPathHandler,
} from "../utils/errorMiddleware";
import { errorLogger } from "../utils/logger";
import cartRouter from "../modules/cart/cart.router";
import orderRouter from "../modules/order/order.router";

async function initRoutes() {
  //routers to handle different routes
  app.use("/", RootRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/carts", cartRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/*", invalidPathHandler);
  app.use("*", invalidPageHandler);

  //global error handling middleware
  app.use(errorLogger);
  app.use(handleClientError);
  app.use(handleError);
}

export default initRoutes;
