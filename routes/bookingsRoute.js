const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingsModel");
const Movie = require("../models/movieModel");
const stripe = require("stripe")(process.env.stripe_key);
const { v4: uuidv4 } = require("uuid");
// book a seat

router.post("/book-seat", authMiddleware, async (req, res) => {
  const newBooking = new Booking({
    ...req.body,
    user: req.body.userId,
  });

  await newBooking.save();
  const movie = await Movie.findById(req.body.movie);
  movie.seatsBooked = [...movie.seatsBooked, ...req.body.seats];
  await movie.save();
  res.status(200).send({
    message: "Compra realizada de manera exitosa",
    data: newBooking,
    success: true,
  });
});

// make payment

// get bookings by user id
router.post("/get-bookings-by-user-id", authMiddleware, async (req, res) => {
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
router.post("/get-all-bookings", authMiddleware, async (req, res) => {
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
