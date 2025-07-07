import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'movie-tracker-movies';

const initialMovies = [
  {
    id: 1,
    title: 'Inception',
    director: 'Christopher Nolan',
    genre: 'Sci-Fi',
    year: 2010,
    rating: 8.8,
    synopsis: 'A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
  },
  {
    id: 2,
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    genre: 'Action',
    year: 2008,
    rating: 9.0,
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
  },
  {
    id: 3,
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    genre: 'Drama',
    year: 1994,
    rating: 8.9,
    synopsis: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
  },
  {
    id: 4,
    title: 'Interstellar',
    director: 'Christopher Nolan',
    genre: 'Sci-Fi',
    year: 2014,
    rating: 8.6,
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
  },
  {
    id: 5,
    title: 'The Matrix',
    director: 'Lana Wachowski',
    genre: 'Sci-Fi',
    year: 1999,
    rating: 8.7,
    synopsis: 'A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.'
  }
];

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedMovies = localStorage.getItem(STORAGE_KEY);
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    } else {
      setMovies(initialMovies);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMovies));
    }
  }, []);

  const saveMovies = (newMovies) => {
    setMovies(newMovies);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMovies));
  };

  const addMovie = (movie) => {
    const newMovie = {
      ...movie,
      id: Date.now(),
      year: parseInt(movie.year),
      rating: parseFloat(movie.rating)
    };
    const updatedMovies = [...movies, newMovie];
    saveMovies(updatedMovies);
    toast.success('Movie added successfully!');
    return newMovie;
  };

  const deleteMovie = (movieId) => {
    const updatedMovies = movies.filter(movie => movie.id !== movieId);
    saveMovies(updatedMovies);
    toast.success('Movie deleted successfully!');
  };

  const getMovieById = (id) => {
    return movies.find(movie => movie.id === parseInt(id));
  };

  const getGenres = () => {
    const genres = [...new Set(movies.map(movie => movie.genre))];
    return ['All', ...genres.sort()];
  };

  return {
    movies,
    loading,
    setLoading,
    addMovie,
    deleteMovie,
    getMovieById,
    getGenres
  };
};