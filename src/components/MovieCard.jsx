import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const getRatingColor = (rating) => {
    if (rating >= 8.5) return 'text-green-600 bg-green-100';
    if (rating >= 7.0) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="card p-6 animate-fade-in bg-blue-100 rounded-2xl">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{movie.title}</h3>
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getRatingColor(movie.rating)}`}>
          {movie.rating}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-gray-600">
          <span className="font-medium">Director:</span> {movie.director}
        </p>
        <div className="flex justify-between items-center">
          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full bg-blue-300 text-sm font-medium">
            {movie.genre}
          </span>
          <span className="text-gray-500 text-sm">{movie.year}</span>
        </div>
      </div>
      
      {movie.synopsis && (
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {movie.synopsis}
        </p>
      )}
      
      <Link
        to={`/movie/${movie.id}`}
        className="block w-30 text-center btn-primary bg-neutral-600 rounded-2xl text-white py-2"
      >
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;