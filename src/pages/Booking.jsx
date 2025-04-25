import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { movies } from '../data/movies';  // Імпортуємо масив фільмів для доступу до назви

const Booking = () => {
  const { id } = useParams(); // Отримуємо id фільму з параметрів URL
  const movie = movies.find(movie => movie.id === parseInt(id)); // Знаходимо фільм за id

  return (
    <div>
      <h2>Кінозал для фільму: {movie ? movie.title : 'Невідомий фільм'}</h2>
      
      {/* Кнопка назад */}
      <Link to="/" className="back-button">Назад до вибору фільму</Link>
      
      {/* Тут пізніше буде сітка місць */}
    </div>
  );
};

export default Booking;
