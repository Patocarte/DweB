import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import "../resourses/BookNow.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

function BookNow() {
  const [dateState, setDateState] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const usid = jwt_decode(localStorage.getItem("token")).userId;
  const getMovie = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(`/api/movies/get-movie-by-id/${id}`,

      );
      dispatch(HideLoading());
      if (response.data.success) {
        setMovie(response.data.data);
        console.log(response.data.data)
      }
      else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const bookNow = async () => {
    try {
      dispatch(ShowLoading());
      const beforebuy = movie.fechas[dateState].seatsBooked
      for (let i = 0; i < beforebuy.length; i++) {
        for (let j = 0; j < selectedSeats.length; j++) {
          if (selectedSeats[j] === beforebuy[i].id) {
            beforebuy[i].usado = true;
          }
        }
      };
      const fech = movie.fechas[dateState].fecha;
      const hor = movie.fechas[dateState].hora;
      const response = await axios.post("/api/bookings/book-seat", {
        movieid: movie._id,
        seats: beforebuy,
        sltddseats: selectedSeats,
        date: dateState,
        userid: usid,
        fech: fech,
        hor: hor,
      });
      console.log(usid);
      dispatch(HideLoading());
      if (response.data.message === 'successfully updated!') {
        message.success(response.data.message);
        navigate(`/user/usid`);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
      console.log(selectedSeats)
  }, [selectedSeats])
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {movie && (
        <Row className="mt-3" gutter={[30, 30]}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-2xl secondary-text">{movie.name}</h1>
            <hr />

            <div className="flex flex-col gap-2">
              <div>
                <h2 className="primary-text">Sinopsis</h2>
                <p>{movie.desc}</p>
              </div>
            </div>
            <hr />

            <div className="flex flex-col gap-2">
              <div className="date-content">

                {movie.fechas.map((fecha, index) => (
                    <div className='dateItem' key={index}>
                      Fecha: {fecha.fecha} <br />
                      Hora: {fecha.hora}
                    </div>
                ) )}
              </div>
              <p>Seleccionar fecha</p>
              <select
                name="index"
                id="index"
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  setDateState(selectedDate);
                }}
              >
                {movie.fechas.map((fecha, index) => <option value={index}>{fecha.fecha}</option>)}

              </select>
              <hr />
              <button
                className={`primary-btn ${
                  selectedSeats.length === 0 && "disabled-btn"
                }`}
                disabled={selectedSeats.length === 0}
                onClick={() => bookNow()}
              >
                Comprar
              </button>
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              movie={movie}
              index={dateState}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;
