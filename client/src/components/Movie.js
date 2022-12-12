import React from "react";
import { useNavigate } from "react-router-dom";
import "../resourses/cartelera.css";

function Movie({ movie }) {
  const navigate = useNavigate();
  return (
    <div className="card p-2 max-size d-flex">
      <div className="movie-image">
        <img src={movie.image} />
      </div>
      <h2 className="movie-title">{movie.name}</h2>
      <hr />
      <div className="movie-desc">
        <p>{movie.desc}</p>
      </div>
      <hr />

      <div className="d-flex justify-content-center align-items-center">
        <h1
          className="text-lg primary-btn"
          onClick={() => {
            navigate(`/eventos/${movie._id}`);
          }}
        >
          Comprar
        </h1>
      </div>
    </div>
  );
}

export default Movie;
