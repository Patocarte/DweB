const router = require("express").Router();
const Booking = require("../models/bookingsModel");
const Movie = require("../models/movieModel");
const { v4: uuidv4 } = require("uuid");
// book a seat

router.post("/book-seat", async (req, res) => {
  const {movieid, seats, date} = req.body;

  const newBooking = new Booking({
    movie: req.body.movieid,
    user: req.body.userid,
    seats: req.body.sltddseats,
    fecha: req.body.fech,
    hora: req.body.hor,
  });
  await newBooking.save();
  const movie = await Movie.findById(movieid);
  const newFechas = movie.fechas;
  newFechas[date].seatsBooked = seats;

  Movie.findOneAndUpdate({_id: movieid}, {fechas: newFechas}, function(err,doc) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    else return res.json({doc, message:'successfully updated!'})
  })
});


// make payment

// get bookings by user id
router.post("/get-bookings-by-user-id", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("movie")
      .populate("user");
    res.status(200).send({
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Bookings fetch failed",
      data: error,
      success: false,
    });
  }
});

// get all bookings
router.post("/get-all-bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("movie").populate("user");
    res.status(200).send({
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Bookings fetch failed",
      data: error,
      success: false,
    });
  }
});

module.exports = router;
