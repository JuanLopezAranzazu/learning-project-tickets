// models
const Category = require("./../models/category.model");

const findAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const findOneCategory = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    // buscar la categoria
    const category = await Category.findById(id);
    if (!category) {
      res
        .status(404)
        .json({ message: `La categoria con id ${id} no se encuentra` });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { body } = req;
    // guardar la categoria en la base de datos
    const newCategory = new Category({
      ...body,
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { params, body } = req;
    const { id } = params;
    // buscar la categoria
    const category = await Category.findById(id);
    if (!category) {
      res
        .status(404)
        .json({ message: `La categoria con id ${id} no se encuentra` });
      return;
    }
    // actualizar la categoria
    const categoryUpdated = await Category.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    res.status(200).json(categoryUpdated);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    // buscar la categoria
    const category = await Category.findById(id);
    if (!category) {
      res
        .status(404)
        .json({ message: `La categoria con id ${id} no se encuentra` });
      return;
    }
    // eliminar la categoria
    await Category.deleteOne({ _id: id });
    res.status(204).json({ message: "Categoria eliminada con éxito" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllCategories,
  findOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
