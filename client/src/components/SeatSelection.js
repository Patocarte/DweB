import React from "react";
import { Row, Col } from "antd";
import "../resourses/movie.css";

function SeatSelection({ selectedSeats, setSelectedSeats, movie, index }) {
  const capacity = movie.capacity;
  const date = movie.fechas[index];

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
          {Array.from(Array(capacity).keys()).map((seat) => {
            let seatClass = "";
            if (selectedSeats.includes(seat + 1)) {
              seatClass = "selected-seat";
            } else if (date.seatsBooked.includes(seat + 1)) {
              seatClass = "booked-seat";
            }
            return (
              <Col span={3}>
                <div
                  className={`seat ${seatClass}`}
                  onClick={() => selectOrUnselectSeats(seat + 1)}
                >
                  {seat + 1}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default SeatSelection;
