import React from 'react';
import { Link } from 'react-router-dom';  // імпортуємо Link для переходу на сторінку бронювання

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p><strong>Жанр:</strong> {movie.genre}</p>
      <p><strong>Дата та час сеансу:</strong> {movie.datetime}</p>
      
      {/* Заміна посилання на кнопку */}
      <Link to={`/booking/${movie.id}`} className="book-button">Забронювати</Link>
    </div>
  );
};

export default MovieCard;
