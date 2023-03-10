import Express from "express";
import cors from "cors";
import initRoutes from "./initRoutes";

import mongoose from "mongoose";
import { requestLogger } from "../utils/logger";
import User from "../models/User";

const PORT = 8080;

const app = Express();

async function initServer() {
  app.use(cors());
  app.use(
    Express.json({
      type: ["json"],
    })
  );
  app.use(requestLogger);
  await mongoose.connect(process.env.DB_URL);

  await initRoutes();
  app.listen(PORT, () => {
    console.log("server is started");
  });
}

export { initServer, app };
