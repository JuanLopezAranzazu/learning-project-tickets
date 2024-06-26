const express = require("express");
const commentRouter = express.Router();

//controllers
const {
  findAllComments,
  findOneComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
//middlewares
const verifyJWT = require("./../middlewares/verifyJWT");
const verifyRoles = require("./../middlewares/verifyRoles");

// routes
// api para obtener todas las categorias
commentRouter.get(
  "/",
  verifyJWT,
  verifyRoles("admin"),
  findAllComments
);
// api para obtener una categoria por id
commentRouter.get("/:id", verifyJWT, verifyRoles("admin"), findOneComment);
// api para crear una categoria
commentRouter.post("/", verifyJWT, verifyRoles("admin"), createComment);
// api para actualizar una categoria
commentRouter.put("/:id", verifyJWT, verifyRoles("admin"), updateComment);
// api para eliminar una categoria
commentRouter.delete("/:id", verifyJWT, verifyRoles("admin"), deleteComment);

module.exports = commentRouter;
