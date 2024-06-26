const express = require("express");
const categoryRouter = express.Router();

//controllers
const {
  findAllCategories,
  findOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
//middlewares
const verifyJWT = require("./../middlewares/verifyJWT");
const verifyRoles = require("./../middlewares/verifyRoles");

// routes
// api para obtener todas las categorias
categoryRouter.get(
  "/",
  verifyJWT,
  verifyRoles("admin", "customer"),
  findAllCategories
);
// api para obtener una categoria por id
categoryRouter.get("/:id", verifyJWT, verifyRoles("admin"), findOneCategory);
// api para crear una categoria
categoryRouter.post("/", verifyJWT, verifyRoles("admin"), createCategory);
// api para actualizar una categoria
categoryRouter.put("/:id", verifyJWT, verifyRoles("admin"), updateCategory);
// api para eliminar una categoria
categoryRouter.delete("/:id", verifyJWT, verifyRoles("admin"), deleteCategory);

module.exports = categoryRouter;
