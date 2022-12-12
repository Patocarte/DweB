import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import "../resourses/BookNow.css";

function BookNow() {
  const [dateState, setDateState] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const getMovie = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/movies/get-movie-by-id", {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setMovie(response.data.data);
      } else {
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
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        movie: movie._id,
        seats: selectedSeats,
        date: dateState,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

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
                <div className="dateItem">
                  Fecha: {movie.fechas[0].fecha} <br />
                  Hora: {movie.fechas[0].hora}
                </div>
                <div className="dateItem">
                  Fecha: {movie.fechas[1].fecha} <br />
                  Hora: {movie.fechas[1].hora}
                </div>
                <div className="dateItem">
                  Fecha: {movie.fechas[2].fecha} <br />
                  Hora: {movie.fechas[2].hora}
                </div>
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
                <option value="0">{movie.fechas[0].fecha}</option>
                <option value="1">{movie.fechas[1].fecha}</option>
                <option value="2">{movie.fechas[2].fecha}</option>
              </select>
              <hr />
              <button
                className={`primary-btn ${
                  selectedSeats.length === 0 && "disabled-btn"
                }`}
                disabled={selectedSeats.length === 0}
                onClick={bookNow}
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
