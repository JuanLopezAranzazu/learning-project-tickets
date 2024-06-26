const express = require("express");
const statusRouter = express.Router();

//controllers
const {
  findAllStatuses,
  findOneStatus,
  createStatus,
  updateStatus,
  deleteStatus,
} = require("../controllers/status.controller");
//middlewares
const verifyJWT = require("./../middlewares/verifyJWT");
const verifyRoles = require("./../middlewares/verifyRoles");

// routes
// api para obtener todos los estados
statusRouter.get(
  "/",
  verifyJWT,
  verifyRoles("admin", "agent", "customer"),
  findAllStatuses
);
// api para obtener un estado por id
statusRouter.get("/:id", verifyJWT, verifyRoles("admin"), findOneStatus);
// api para crear un estado
statusRouter.post("/", verifyJWT, verifyRoles("admin"), createStatus);
// api para actualizar un estado
statusRouter.put("/:id", verifyJWT, verifyRoles("admin"), updateStatus);
// api para eliminar un estado
statusRouter.delete("/:id", verifyJWT, verifyRoles("admin"), deleteStatus);

module.exports = statusRouter;
