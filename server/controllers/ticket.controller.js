// models
const Ticket = require("./../models/ticket.model");

const findAllTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({})
      .populate("status")
      .populate("category");
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

// obtener tickets dado un tipo de usuario
const findAllTicketsByUser = async (req, res, next, userType) => {
  try {
    const { userId } = req;
    const searchField =
      userType === "customer" ? "creatorUser" : "assignedUser";
    const tickets = await Ticket.find({ [searchField]: userId })
      .populate("status")
      .populate("category");
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

// obtener los tickets de un customer
const findAllTicketsByCustomer = (req, res, next) => {
  return findAllTicketsByUser(req, res, next, "customer");
};

// obtener los tickets de un agent
const findAllTicketsByAgent = (req, res, next) => {
  return findAllTicketsByUser(req, res, next, "agent");
};

const findOneTicket = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    // buscar el ticket
    const ticket = await Ticket.findById(id)
      .populate("status")
      .populate("category");
    if (!ticket) {
      res
        .status(404)
        .json({ message: `El ticket con id ${id} no se encuentra` });
      return;
    }
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

const createTicket = async (req, res, next) => {
  try {
    const { body } = req;
    // guardar el ticket en la base de datos
    const newTicket = new Ticket({
      ...body,
    });
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    next(error);
  }
};

const updateTicket = async (req, res, next) => {
  try {
    const { params, body } = req;
    const { id } = params;
    // buscar el ticket
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      res
        .status(404)
        .json({ message: `El ticket con id ${id} no se encuentra` });
      return;
    }
    // actualizar el ticket
    const ticketUpdated = await Ticket.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    res.status(200).json(ticketUpdated);
  } catch (error) {
    next(error);
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    // buscar el ticket
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      res
        .status(404)
        .json({ message: `El ticket con id ${id} no se encuentra` });
      return;
    }
    // eliminar el ticket
    await Ticket.deleteOne({ _id: id });
    res.status(204).json({ message: "Ticket eliminado con éxito" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllTickets,
  findOneTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  findAllTicketsByCustomer,
  findAllTicketsByAgent,
};
