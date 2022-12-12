import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MovieForm from "../../components/MovieForm";
import PageTitle from "../../components/PageTitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";

function AdminMovies() {
  const dispatch = useDispatch();
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const getMovies = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/movies/get-all-movies",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setMovies(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteMovie = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/movies/delete-movie", {
        _id: id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getMovies();
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
      title: "Titulo",
      dataIndex: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          <i
            class="ri-delete-bin-line"
            onClick={() => {
              deleteMovie(record._id);
            }}
          ></i>
          <i
            class="ri-pencil-line"
            onClick={() => {
              setSelectedMovie(record);
              setShowMovieForm(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <PageTitle title="Peliculas " />
        <button className="primary-btn" onClick={() => setShowMovieForm(true)}>
          Agregar Pelicula
        </button>
      </div>

      <Table columns={columns} dataSource={movies} />

      {showMovieForm && (
        <MovieForm
          showMovieForm={showMovieForm}
          setShowMovieForm={setShowMovieForm}
          type={selectedMovie ? "edit" : "add"}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getData={getMovies}
        />
      )}
    </div>
  );
}

export default AdminMovies;
