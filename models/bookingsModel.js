const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: "movies",
      require: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      require: true,
    },
    seats: {
      type: Array,
      require: true,
    },
    fecha: {
      type: String,
        ref: "fecha",
      require: true
      },
    hora: {
      type: String,
        ref: "hora",
      require: true
      },
    transactionId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookings", bookingSchema);
