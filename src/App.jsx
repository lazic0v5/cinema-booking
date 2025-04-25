import React, { useState } from 'react';
import './index.css';
import { movies } from './data/movies';
import MovieList from './components/MovieList';

function App() {
  const [search, setSearch] = useState('');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Кіносеанси</h1>
      <input
        type="text"
        placeholder="Пошук фільму..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />
      <MovieList movies={filteredMovies} />
    </div>
  );
}

export default App;
