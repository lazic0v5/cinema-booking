// services/BookingService.js
const BookingService = {
    getOccupiedSeats: (movieId) => {
      // Тут ви можете використовувати LocalStorage або Firebase
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const movieBooking = bookings.find(booking => booking.movieId === movieId);
      return movieBooking ? new Set(movieBooking.seats) : new Set();
    },
  
    bookSeats: (movieId, selectedSeats, userData) => {
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      let movieBooking = bookings.find(booking => booking.movieId === movieId);
  
      if (!movieBooking) {
        movieBooking = { movieId, seats: [] };
        bookings.push(movieBooking);
      }
  
      // Додаємо заброньовані місця до існуючих
      movieBooking.seats = [...movieBooking.seats, ...selectedSeats];
      localStorage.setItem('bookings', JSON.stringify(bookings));
  
      // Зберігаємо дані користувача
      console.log('User Data: ', userData);
    }
  };
  
  export default BookingService;
  