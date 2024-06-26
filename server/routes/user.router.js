const express = require("express");
const userRouter = express.Router();

//controllers
const {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
//middlewares
const verifyJWT = require("./../middlewares/verifyJWT");
const verifyRoles = require("./../middlewares/verifyRoles");

// routes
// api para obtener todos los usuarios
userRouter.get("/", verifyJWT, verifyRoles("admin"), findAllUsers);
// api para obtener un usuario por id
userRouter.get("/:id", verifyJWT, verifyRoles("admin"), findOneUser);
// api para crear un usuario
userRouter.post("/", verifyJWT, verifyRoles("admin"), createUser);
// api para actualizar un usuario
userRouter.put("/:id", verifyJWT, verifyRoles("admin"), updateUser);
// api para eliminar un usuario
userRouter.delete("/:id", verifyJWT, verifyRoles("admin"), deleteUser);

module.exports = userRouter;
