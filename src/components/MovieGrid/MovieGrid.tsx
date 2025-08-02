import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  const handleCardClick = (movie: Movie) => {
    onSelect(movie);
  };

  const getImageUrl = (posterPath: string | null) => {
    if (!posterPath) {
      return "https://via.placeholder.com/500x750?text=No+Image";
    }
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  };

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div
            className={css.card}
            onClick={() => handleCardClick(movie)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleCardClick(movie);
              }
            }}>
            <img
              className={css.image}
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
