const express = require("express");
const ticketRouter = express.Router();

//controllers
const {
  findAllTickets,
  findOneTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  findAllTicketsByCustomer,
  findAllTicketsByAgent,
} = require("../controllers/ticket.controller");
//middlewares
const verifyJWT = require("./../middlewares/verifyJWT");
const verifyRoles = require("./../middlewares/verifyRoles");

// routes
// api para obtener todos los tickets
ticketRouter.get("/", verifyJWT, verifyRoles("admin"), findAllTickets);
// api para obtener los tickets de un customer
ticketRouter.get(
  "/customer",
  verifyJWT,
  verifyRoles("admin", "customer"),
  findAllTicketsByCustomer
);
// api para obtener los tickets de un agent
ticketRouter.get(
  "/agent",
  verifyJWT,
  verifyRoles("admin", "agent"),
  findAllTicketsByAgent
);
// api para obtener un ticket
ticketRouter.get(
  "/:id",
  verifyJWT,
  verifyRoles("admin", "agent", "customer"),
  findOneTicket
);
// api para crear un ticket
ticketRouter.post(
  "/",
  verifyJWT,
  verifyRoles("admin", "customer"),
  createTicket
);
// api para actualizar un ticket
ticketRouter.put(
  "/:id",
  verifyJWT,
  verifyRoles("admin", "agent", "customer"),
  updateTicket
);
// api para eliminar un ticket
ticketRouter.delete("/:id", verifyJWT, verifyRoles("admin"), deleteTicket);

module.exports = ticketRouter;
