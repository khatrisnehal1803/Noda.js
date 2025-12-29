import { useState } from "react";
import { Header } from "@/components/Header";
import { MovieGrid } from "@/components/MovieGrid";
import { MovieFormModal } from "@/components/MovieFormModal";
import { MovieDetailModal } from "@/components/MovieDetailModal";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { useMovieStore } from "@/store/movieStore";


const Index = () => {
  const { getFilteredMovies, addMovie, updateMovie, deleteMovie } = useMovieStore();
  const movies = getFilteredMovies();

  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null);

  const handleAddClick = () => {
    setEditingMovie(null);
    setFormOpen(true);
  };

  const handleEditClick = (movie) => {
    setEditingMovie(movie);
    setFormOpen(true);
  };

  const handleDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setDeleteOpen(true);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setDetailOpen(true);
  };

  const handleSave = (data) => {
    if (editingMovie) {
      updateMovie(editingMovie.id, data);
    } else {
      addMovie(data);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedMovie) {
      deleteMovie(selectedMovie.id);
      setDeleteOpen(false);
      setSelectedMovie(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Header onAddMovie={handleAddClick} />

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Movie Collection
          </h2>
          <p className="text-muted-foreground">
            {movies.length} {movies.length === 1 ? "movie" : "movies"} in your library
          </p>
        </motion.div>

        {/* Movie Grid */}
        <MovieGrid
          movies={movies}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onClick={handleMovieClick}
        />
      </main>

      {/* Modals */}
      <MovieFormModal
        movie={editingMovie}
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />

      <MovieDetailModal
        movie={selectedMovie}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <DeleteConfirmDialog
        movie={selectedMovie}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Index;