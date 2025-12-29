import { MovieCard } from "./MovieCard";

import { Film } from "lucide-react";

export function MovieGrid({ movies, onEdit, onDelete, onClick }) {
  if (movies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary mb-4">
          <Film className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No movies found</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          Start building your collection by adding your first movie or try a different search.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onClick={onClick}
        />
      ))}
    </div>
  );
}