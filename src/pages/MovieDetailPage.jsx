import { useParams, useNavigate } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import AIRecommendations from '../components/AIRecommendations';
import toast from 'react-hot-toast';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMovieById, deleteMovie } = useMovies();
  
  const movie = getMovieById(id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Movie Not Found</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      deleteMovie(movie.id);
      navigate('/');
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 8.5) return 'text-green-600 bg-green-100';
    if (rating >= 7.0) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{movie.title}</h1>
                <span className={`px-3 py-1 rounded-full text-lg font-medium ${getRatingColor(movie.rating)}`}>
                  ⭐ {movie.rating}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    <span className="font-medium">Director:</span> {movie.director}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">Year:</span> {movie.year}
                  </span>
                </div>
                
                <div>
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {movie.genre}
                  </span>
                </div>
              </div>
              
              {movie.synopsis && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Synopsis</h3>
                  <p className="text-gray-600 leading-relaxed">{movie.synopsis}</p>
                </div>
              )}
              
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="btn-primary"
                >
                  ← Back to Home
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                >
                  Delete Movie
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Recommendations */}
        <AIRecommendations movie={movie} />
      </div>
    </div>
  );
};

export default MovieDetailPage;