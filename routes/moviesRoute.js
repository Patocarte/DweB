const router = require("express").Router();
const Movie = require("../models/MovieModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add-movie

router.post("/add-movie", async (req, res) => {
  try {
    const existingMovie = await Movie.findOne({ number: req.body.number });
    if (existingMovie) {
      return res.status(200).send({
        success: false,
        message: "Ya existe esta pelicula",
      });
    }
    const newMovie = new Movie(req.body);
    await newMovie.save();
    return res.status(200).send({
      success: true,
      message: "Pelicula agregada recientemente",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// update-movie

router.post("/update-movie", async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).send({
      success: true,
      message: "Pelicula actualizada correctamente",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// delete-movie

router.post("/delete-movie", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Pelicula eliminada de manera correcta",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// get-all-movies

router.get("/get-all-movies", async (req, res) => {
  try {
    const movies = await Movie.find(req.body);
    return res.status(200).send({
      success: true,
      message: "Movies fetched successfully",
      data: movies,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// get-movie-by-id

router.get("/get-movie-by-id/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    console.log(req);
    return res.status(200).send({
      success: true,
      message: "Movie fetched successfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
