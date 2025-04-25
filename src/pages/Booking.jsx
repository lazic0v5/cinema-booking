import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { movies } from '../data/movies';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find(movie => movie.id === parseInt(id));
  
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]); // Стан для вибраних місць

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

  // Обробник для натискання на місце
  const handleSeatClick = (seatId) => {
    // Перевіряємо, чи місце вільне
    const updatedSeats = seats.map(rowSeats => 
      rowSeats.map(seat => 
        seat.id === seatId && seat.status === 'free' 
          ? { ...seat, status: 'selected' }  // Якщо місце вільне, виділяємо його
          : seat
      )
    );
    setSeats(updatedSeats);

    // Додаємо або видаляємо місце з вибраних
    setSelectedSeats(prevSelected => {
      if (prevSelected.includes(seatId)) {
        return prevSelected.filter(id => id !== seatId); // Якщо вже вибрано, забираємо
      } else {
        return [...prevSelected, seatId]; // Якщо не вибрано, додаємо
      }
    });
  };

  // Функція для показу кнопки "Купити"
  const handleBuyClick = () => {
    alert(`Ви забронювали місця: ${selectedSeats.join(', ')}`);
    // Тут ми можемо реалізувати збереження в LocalStorage або Firebase
  };

  return (
    <div>
      <h2>Кінозал для фільму: {movie ? movie.title : 'Невідомий фільм'}</h2>
      <Link to="/" className="back-button">Назад до вибору фільму</Link>
      <div className="seats-grid">
        {seats.flat().map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.status}`}
            onClick={() => handleSeatClick(seat.id)} // Додаємо обробник натискання
          ></div>
        ))}
      </div>

      {/* Кнопка для підтвердження бронювання */}
      {selectedSeats.length > 0 && (
        <button className="book-button" onClick={handleBuyClick}>
          Купити
        </button>
      )}
    </div>
  );
};

export default Booking;
