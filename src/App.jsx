import React, { useState } from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { movies } from './data/movies';
import Home from './pages/Home';
import Booking from './pages/Booking';

function App() {
  const [search, setSearch] = useState('');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Router>
      <div className="app">
        <h1>Кіносеанси</h1>
        <input
          type="text"
          placeholder="Пошук фільму..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />

        {/* Маршрутизація */}
        <Routes>
          <Route path="/" element={<Home movies={filteredMovies} />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
