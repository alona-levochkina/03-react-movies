import { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovie } from "../../services/movieService";
import type { Movie } from "../../types/movie";

interface AppState {
  movies: Movie[];
  isLoading: boolean;
  error: boolean;
  selectedMovie: Movie | null;
}

const App = () => {
  const [state, setState] = useState<AppState>({
    movies: [],
    isLoading: false,
    error: false,
    selectedMovie: null,
  });

  const handleSearch = async (query: string) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: false,
      movies: [],
    }));

    try {
      const movies = await fetchMovie(query);

      if (movies.length === 0) {
        toast.error("No movies found for your request.");
      }

      setState((prev) => ({
        ...prev,
        movies,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching movies:", error);
      setState((prev) => ({
        ...prev,
        error: true,
        isLoading: false,
      }));
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setState((prev) => ({
      ...prev,
      selectedMovie: movie,
    }));
  };

  const handleModalClose = () => {
    setState((prev) => ({
      ...prev,
      selectedMovie: null,
    }));
  };

  const { movies, isLoading, error, selectedMovie } = state;

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />

      <main>
        {isLoading && <Loader />}

        {error && <ErrorMessage />}

        {!isLoading && !error && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleMovieSelect} />
        )}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleModalClose} />
        )}
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default App;
