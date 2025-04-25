import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { movies } from '../data/movies';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find(movie => movie.id === parseInt(id));

  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const rows = 10;
    const columns = 18;
    const allSeats = [];

    for (let row = 0; row < rows; row++) {
      let rowSeats = [];
      for (let col = 0; col < columns; col++) {
        rowSeats.push({
          id: `${row}-${col}`,
          status: 'free'
        });
      }
      allSeats.push(rowSeats);
    }

    const totalSeats = rows * columns;
    const occupiedCount = Math.floor(Math.random() * (totalSeats / 2));
    const occupiedSeats = new Set();
    while (occupiedSeats.size < occupiedCount) {
      const randomIndex = Math.floor(Math.random() * totalSeats);
      const row = Math.floor(randomIndex / columns);
      const col = randomIndex % columns;
      occupiedSeats.add(`${row}-${col}`);
    }

    allSeats.forEach((rowSeats, rowIndex) => {
      rowSeats.forEach((seat, colIndex) => {
        if (occupiedSeats.has(`${rowIndex}-${colIndex}`)) {
          seat.status = 'occupied';
        }
      });
    });

    setSeats(allSeats);
  }, [id]);

  return (
    <div>
      <h2>Кінозал для фільму: {movie ? movie.title : 'Невідомий фільм'}</h2>
      <Link to="/" className="back-button">Назад до вибору фільму</Link>
      <div className="seats-grid">
        {seats.flat().map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.status}`}
            data-tip={`Ряд ${parseInt(seat.id.split('-')[0]) + 1} Місце ${parseInt(seat.id.split('-')[1]) + 1}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
