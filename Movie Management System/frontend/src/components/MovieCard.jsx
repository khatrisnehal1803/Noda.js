// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Calendar, Film, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MovieCard({ movie, index, onEdit, onDelete, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group relative overflow-hidden rounded-xl gradient-card border border-border/50 shadow-card hover:border-primary/30 transition-all duration-300"
    >
      {/* Poster */}
      <div
        className="relative aspect-[2/3] cursor-pointer overflow-hidden"
        onClick={() => onClick(movie)}
      >
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 bg-secondary/90 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(movie);
            }}
          >
            <Pencil className="h-3 w-3" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="bg-destructive/90 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(movie);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate mb-1">{movie.title}</h3>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Film className="h-3 w-3" />
            {movie.genre}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {movie.releaseYear}
          </span>
        </div>
      </div>
    </motion.div>
  );
}