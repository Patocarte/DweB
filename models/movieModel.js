const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  fare: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  fechas: {
    type: Array,
    required: true
  },
  journeyDate: {
    type: String,
    required: true
  }
});

mongoose.models = {};

const MovieSchema =
  mongoose.model.MovieSchema || mongoose.model("movies", Schema);

module.exports = MovieSchema;
