import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { movies } from '../data/movies';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find(movie => movie.id === parseInt(id));
  
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]); // Стан для вибраних місць
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан для відкриття модального вікна
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [occupiedModal, setOccupiedModal] = useState(false); // Стан для модального вікна попередження про зайняте місце

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
    const seat = seats.flat().find(seat => seat.id === seatId);

    if (seat.status === 'occupied') {
      setOccupiedModal(true); // Якщо місце зайняте, відкриваємо модальне вікно попередження
      return;
    }

    const updatedSeats = seats.map(rowSeats => 
      rowSeats.map(seat => 
        seat.id === seatId && seat.status === 'free' 
          ? { ...seat, status: 'selected' }
          : seat
      )
    );
    setSeats(updatedSeats);

    setSelectedSeats(prevSelected => {
      if (prevSelected.includes(seatId)) {
        return prevSelected.filter(id => id !== seatId);
      } else {
        return [...prevSelected, seatId];
      }
    });
  };

  // Обробник для натискання кнопки "Купити"
  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  // Обробник для зміни значень у формі
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Обробник для подання форми
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Ви забронювали місця: ${selectedSeats.join(', ')} на фільм ${movie.title}.`);
    setIsModalOpen(false); // Закриваємо модальне вікно
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
            onClick={() => handleSeatClick(seat.id)}
            data-tip={`Ряд ${Math.floor(parseInt(seat.id.split('-')[0])) + 1} Місце ${parseInt(seat.id.split('-')[1]) + 1}`}
          ></div>
        ))}
      </div>

      {selectedSeats.length > 0 && (
        <button className="book-button" onClick={handleBuyClick}>
          Купити
        </button>
      )}

      {/* Модальне вікно для введення даних */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Заповніть дані для бронювання</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Ім'я</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div>
                <label>Телефон</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div>
                <label>Емейл</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div>
                <p>Вибрані місця: {selectedSeats.join(', ')}</p>
                <p>Фільм: {movie.title}</p>
              </div>
              <button type="submit">Підтвердити бронювання</button>
            </form>
            <button onClick={() => setIsModalOpen(false)}>Закрити</button>
          </div>
        </div>
      )}

      {/* Модальне вікно для зайнятого місця */}
      {occupiedModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Це місце вже зайняте!</p>
            <button onClick={() => setOccupiedModal(false)}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
