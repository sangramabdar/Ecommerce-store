// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// require("dotenv").config();
// const initServer_1 = require("./build/config/initServer");
// (0, initServer_1.initServer)();

const express = require("express");

const app = express();

app.use("*", (req, res) => {
  res.send("server is ready");
});

app.listen(8080, () => {
  console.log("server started on port : ", 8080);
});
