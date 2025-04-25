import React from 'react';
import MovieList from '../components/MovieList';

const Home = ({ movies }) => {
  return (
    <div>
      <h2>Список фільмів</h2>
      <MovieList movies={movies} />
    </div>
  );
}

export default Home;
