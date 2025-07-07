import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMovies } from '../hooks/useMovies';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  director: Yup.string().required('Director is required'),
  genre: Yup.string().required('Genre is required'),
  year: Yup.number()
    .required('Year is required')
    .min(1900, 'Year must be after 1900')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  rating: Yup.number()
    .required('Rating is required')
    .min(1, 'Rating must be at least 1')
    .max(10, 'Rating cannot exceed 10'),
  synopsis: Yup.string()
});

const AddMoviePage = () => {
  const navigate = useNavigate();
  const { addMovie } = useMovies();

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama',
    'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
  ];

  const handleSubmit = (values, { setSubmitting }) => {
    try {
      addMovie(values);
      navigate('/');
    } catch (error) {
      toast.error('Failed to add movie');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Add New Movie
          </h1>
          
          <Formik
            initialValues={{
              title: '',
              director: '',
              genre: '',
              year: '',
              rating: '',
              synopsis: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <Field
                    type="text"
                    name="title"
                    className={`w-full px-3 py-2 border ${
                      errors.title && touched.title ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Enter movie title"
                  />
                  <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Director *
                  </label>
                  <Field
                    type="text"
                    name="director"
                    className={`w-full px-3 py-2 border ${
                      errors.director && touched.director ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Enter director name"
                  />
                  <ErrorMessage name="director" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genre *
                  </label>
                  <Field
                    as="select"
                    name="genre"
                    className={`w-full px-3 py-2 border ${
                      errors.genre && touched.genre ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  >
                    <option value="">Select a genre</option>
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="genre" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year *
                    </label>
                    <Field
                      type="number"
                      name="year"
                      className={`w-full px-3 py-2 border ${
                        errors.year && touched.year ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="2024"
                    />
                    <ErrorMessage name="year" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating (1-10) *
                    </label>
                    <Field
                      type="number"
                      name="rating"
                      step="0.1"
                      min="1"
                      max="10"
                      className={`w-full px-3 py-2 border ${
                        errors.rating && touched.rating ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="8.5"
                    />
                    <ErrorMessage name="rating" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Synopsis (Optional)
                  </label>
                  <Field
                    as="textarea"
                    name="synopsis"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter movie synopsis..."
                  />
                  <ErrorMessage name="synopsis" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Movie'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="flex-1 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddMoviePage;