import { useState } from "react";
import { geminiService } from "../utils/geminiService";
import toast from "react-hot-toast";

const AIRecommendations = ({ movie }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const recs = await geminiService.getMovieRecommendations(
        movie.title,
        movie.director,
        movie.genre
      );
      setRecommendations(recs);
      setHasLoaded(true);
      toast.success("Recommendations loaded!");
    } catch (error) {
      toast.error("Failed to load recommendations");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        🤖 AI Movie Recommendations
      </h3>

      {!hasLoaded && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Get personalized movie recommendations based on "{movie.title}"
          </p>
          <button
            onClick={fetchRecommendations}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Loading...
              </span>
            ) : (
              "Get Recommendations"
            )}
          </button>
        </div>
      )}

      {hasLoaded && (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">
            Movies similar to "{movie.title}":
          </p>
          <div className="grid gap-4">
            {recommendations.map((rec, index) => (
              <div
                key={`${rec.title}-${index}`}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 animate-slide-up border border-indigo-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                <p className="text-gray-600 text-sm">
                  Director: {rec.director}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center"> {/* Added this wrapper div */}
            <button
              onClick={fetchRecommendations}
              disabled={loading}
              className="px-6 py-2 bg-blue-950 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Loading...
                </span>
              ) : (
                "New Recommendations"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;