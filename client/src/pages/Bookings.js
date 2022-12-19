import { message, Modal, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../components/PageTitle";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import jwt_decode from "jwt-decode";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const getBookings = async () => {
    const usid = jwt_decode(localStorage.getItem("token")).userId;
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/bookings/get-bookings-by-user-id",
        {userId: usid}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.movie,
            key: booking._id,
          };
        });
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Pelicula",
      dataIndex: "name",
      key: "movie",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "movie",
    },
    {
      title: "Hora",
      dataIndex: "hora",
      key: "movie",
    },
    {
      title: "Asientos",
      dataIndex: "seats",
      render: (seats) => {
        return seats.join(", ");
      },
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      <PageTitle title="Entradas" />
      <div className="mt-2">
        <Table dataSource={bookings} columns={columns} />
      </div>


    </div>
  );
}

export default Bookings;
