const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "El texto es requerido"],
    },
    // Relación con el modelo de users
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    // Relación con el modelo de tickets
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "ticket",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
