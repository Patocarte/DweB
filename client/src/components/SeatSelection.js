import React from "react";
import { Row, Col } from "antd";
import "../resourses/movie.css";
import Seat from '../components/Seat'

function SeatSelection({ selectedSeats, setSelectedSeats, movie, index }) {
  const selectOrUnselectSeats = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div className="mx-5">
      <div className="movie-screen">PANTALLA</div>
      <div className="movie-container">
          <Row gutter={[10, 10]}>
          {movie.fechas[index].seatsBooked.map((seat) => {

            return (
                <Seat seat={seat} setSelectedSeats = {setSelectedSeats} selectedSeats={selectedSeats}/>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default SeatSelection;
