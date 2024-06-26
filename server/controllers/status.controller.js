// models
const Status = require("./../models/status.model");

const findAllStatuses = async (req, res, next) => {
  try {
    const statuses = await Status.find({});
    res.status(200).json(statuses);
  } catch (error) {
    next(error);
  }
};

const findOneStatus = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    // buscar el estado
    const status = await Status.findById(id);
    if (!status) {
      res
        .status(404)
        .json({ message: `El estado con id ${id} no se encuentra` });
      return;
    }
    res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};

const createStatus = async (req, res, next) => {
  try {
    const { body } = req;
    // guardar el estado en la base de datos
    const newStatus = new Status({
      ...body,
    });
    const savedStatus = await newStatus.save();
    res.status(201).json(savedStatus);
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { params, body } = req;
    const { id } = params;
    // buscar el estado
    const status = await Status.findById(id);
    if (!status) {
      res
        .status(404)
        .json({ message: `El estado con id ${id} no se encuentra` });
      return;
    }
    // actualizar el estado
    const statusUpdated = await Status.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    res.status(200).json(statusUpdated);
  } catch (error) {
    next(error);
  }
};

const deleteStatus = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    // buscar el estado
    const status = await Status.findById(id);
    if (!status) {
      res
        .status(404)
        .json({ message: `El estado con id ${id} no se encuentra` });
      return;
    }
    // eliminar el estado
    await Status.deleteOne({ _id: id });
    res.status(204).json({ message: "Estado eliminado con éxito" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllStatuses,
  findOneStatus,
  createStatus,
  updateStatus,
  deleteStatus,
};
