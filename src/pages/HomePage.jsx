import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import FilterSort from '../components/FilterSort';

const HomePage = () => {
  const { movies, getGenres } = useMovies();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  
  const genres = getGenres();
  
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies;
    
    if (selectedGenre !== 'All') {
      filtered = movies.filter(movie => movie.genre === selectedGenre);
    }
    
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'year') {
        return b.year - a.year;
      }
      return 0;
    });
    
    return sorted;
  }, [movies, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎬 Movie Tracker
          </h1>
          <p className="text-gray-600">
            Discover, track, and get AI-powered movie recommendations
          </p>
        </div>
        
        {/* Add Movie Button */}
        <div className="flex justify-center mb-8">
          <Link to="/add-movie" className="btn-primary text-center text-lg px-6 py-3 bg-indigo-400 hover:bg-indigo-500 rounded-2xl text-white">
           Add New Movie
          </Link>
        </div>
        
        {/* Filter & Sort */}
        <FilterSort
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          sortBy={sortBy}
          onSortChange={setSortBy}
          genres={genres}
        />
        
        {/* Movie Grid */}
        {filteredAndSortedMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {selectedGenre === 'All' 
                ? 'No movies found. Add your first movie!' 
                : `No movies found in ${selectedGenre} genre.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        
        {/* Stats */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Total Movies: {movies.length} | 
            Showing: {filteredAndSortedMovies.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;