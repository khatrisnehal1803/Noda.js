import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Film, Pencil, Trash2, X } from "lucide-react";


export function MovieDetailModal({
  movie,
  open,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!movie) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-card border-border">
        <div className="relative">
          {/* Background Image */}
          <div className="absolute inset-0 h-48">
            <img
              src={movie.posterUrl}
              alt=""
              className="w-full h-full object-cover opacity-30 blur-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-card" />
          </div>

          <div className="relative p-6">
            <DialogHeader className="sr-only">
              <DialogTitle>{movie.title}</DialogTitle>
            </DialogHeader>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Content */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              {/* Poster */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="shrink-0 mx-auto sm:mx-0"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-40 h-60 object-cover rounded-lg shadow-card"
                />
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1 text-center sm:text-left"
              >
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {movie.title}
                </h2>

                <div className="flex items-center justify-center sm:justify-start gap-4 text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <Film className="h-4 w-4 text-primary" />
                    {movie.genre}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    {movie.releaseYear}
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {movie.description}
                </p>

                {/* Actions */}
                <div className="flex gap-3 justify-center sm:justify-start">
                  <Button
                    variant="outline"
                    onClick={() => {
                      onEdit(movie);
                      onClose();
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit Movie
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      onDelete(movie);
                      onClose();
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}