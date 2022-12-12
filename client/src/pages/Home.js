import { Col, message, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../components/Movie";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function Home() {
  const [filters = {}, setFilters] = useState({});
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/movies/get-all-movies",
        tempFilters,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <div className="my-3 py-1">
        <Row gutter={10} align="center">
          <Col lg={12} sm={24}>
            <input
              type="text"
              placeholder="Nombre Pelicula..."
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </Col>

          <Col lg={6} sm={24}>
            <input
              type="date"
              placeholder="Date"
              value={filters.journeyDate}
              onChange={(e) =>
                setFilters({ ...filters, journeyDate: e.target.value })
              }
            />
          </Col>
          <Col lg={6} sm={24}>
            <div className="d-flex gap-2">
              <button className="primary-btn" onClick={() => getMovies()}>
                Filtrar
              </button>
              <button
                className="outlined px-3"
                onClick={() =>
                  setFilters({
                    from: "",
                    journeyDate: "",
                  })
                }
              >
                Limpiar
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[15, 15]}>
          {movies
            .filter((movie) => movie.status === "Yet To Start")
            .map((movie) => (
              <Col lg={6} xs={24} sm={24}>
                <Movie movie={movie} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
