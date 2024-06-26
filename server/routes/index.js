const express = require("express");

//routes
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const ticketRouter = require("./ticket.router");
const categoryRouter = require("./category.router");
const statusRouter = require("./status.router");
const commentRouter = require("./comment.router");

function routes(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/auth", authRouter);
  router.use("/user", userRouter);
  router.use("/ticket", ticketRouter);
  router.use("/category", categoryRouter);
  router.use("/status", statusRouter);
  router.use("/comment", commentRouter);
}

module.exports = routes;
