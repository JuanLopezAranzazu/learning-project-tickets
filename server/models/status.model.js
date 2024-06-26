const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
    unique: true,
  },
});

const Status = mongoose.model("status", statusSchema);

module.exports = Status;
