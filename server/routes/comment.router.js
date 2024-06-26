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
// api para obtener todos los comentarios
commentRouter.get("/", verifyJWT, verifyRoles("admin"), findAllComments);
// api para obtener un comentario por id
commentRouter.get("/:id", verifyJWT, verifyRoles("admin"), findOneComment);
// api para crear un comentario
commentRouter.post("/", verifyJWT, verifyRoles("admin"), createComment);
// api para actualizar un comentario
commentRouter.put("/:id", verifyJWT, verifyRoles("admin"), updateComment);
// api para eliminar un comentario
commentRouter.delete("/:id", verifyJWT, verifyRoles("admin"), deleteComment);

module.exports = commentRouter;
