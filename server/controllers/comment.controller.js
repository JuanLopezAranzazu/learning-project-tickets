// models
const Comment = require("./../models/comment.model");

const findAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

const findOneComment = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    // buscar el comentario
    const comment = await Comment.findById(id);
    if (!comment) {
      res
        .status(404)
        .json({ message: `El comentario con id ${id} no se encuentra` });
      return;
    }
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { body } = req;
    // guardar el comentario en la base de datos
    const newComment = new Comment({
      ...body,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { params, body } = req;
    const { id } = params;
    // buscar el comentario
    const comment = await Comment.findById(id);
    if (!comment) {
      res
        .status(404)
        .json({ message: `La categoria con id ${id} no se encuentra` });
      return;
    }
    // actualizar el comentario
    const commentUpdated = await Comment.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    res.status(200).json(commentUpdated);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    // buscar el comentario
    const comment = await Comment.findById(id);
    if (!comment) {
      res
        .status(404)
        .json({ message: `El comentario con id ${id} no se encuentra` });
      return;
    }
    // eliminar el comentario
    await Comment.deleteOne({ _id: id });
    res.status(204).json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllComments,
  findOneComment,
  createComment,
  updateComment,
  deleteComment,
};
