import {Col} from "antd";
import React, {useState} from "react";

function Seat({seat, setSelectedSeats, selectedSeats}) {
    const [color, setColor] = useState('')
    const handleSeatClick = (seat) => {
        const state = seat.usado
        if(color === '')  setColor('selected-seat')
        if (color === 'selected-seat')  setColor('')
        if(selectedSeats.includes(seat.id)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat.id))
        }
        if(!selectedSeats.includes(seat.id)) {
            setSelectedSeats([...selectedSeats, seat.id])
        }


    }
    return (
        <Col span={3}>
            <div
                className={`seat ${seat.usado ? 'booked-seat': color}`}
                onClick = {() => handleSeatClick(seat)}
            >
                {seat.id}
            </div>
        </Col>
    )
}
export default Seat