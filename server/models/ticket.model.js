const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El titulo es requerido"],
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
    },
    // Relación con el modelo de users
    creatorUser: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "El usuario creador es requerido"],
    },
    // Relación con el modelo de users
    assignedUser: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    // Relación con el modelo de categories
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: [true, "La categoría es requerida"],
    },
    // Relación con el modelo de status
    status: {
      type: Schema.Types.ObjectId,
      ref: "status",
      required: [true, "El estado es requerido"],
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("ticket", ticketSchema);

module.exports = Ticket;
