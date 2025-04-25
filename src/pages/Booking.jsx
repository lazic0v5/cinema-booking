import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { movies } from '../data/movies';  // Імпортуємо масив фільмів для доступу до назви

const Booking = () => {
  const { id } = useParams(); // Отримуємо id фільму з параметрів URL
  const movie = movies.find(movie => movie.id === parseInt(id)); // Знаходимо фільм за id

  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (movie) {
      // Генерація місць для кінозалу
      const totalSeats = 50; // Загальна кількість місць
      const occupiedSeats = Math.floor(Math.random() * 20); // Кількість зайнятих місць (від 0 до 20)

      const newSeats = [];
      for (let i = 0; i < totalSeats; i++) {
        newSeats.push({
          id: i,
          occupied: i < occupiedSeats, // Місце зайняте, якщо i менше за occupiedSeats
        });
      }
      setSeats(newSeats);
    }
  }, [movie]);

  return (
    <div>
      <h2>Кінозал для фільму: {movie ? movie.title : 'Невідомий фільм'}</h2>
      
      {/* Кнопка назад */}
      <Link to="/" className="back-button">Назад до вибору фільму</Link>
      
      {/* Сітка місць */}
      <div className="seats-grid">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.occupied ? 'occupied' : 'available'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Booking;
