import { Film, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMovieStore } from "@/store/movieStore";


export function Header({ onAddMovie }) {
  const { searchQuery, setSearchQuery } = useMovieStore();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-accent shadow-glow">
              <Film className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              Movie<span className="text-primary">Hub</span>
            </h1>
          </div>

          {/* Search & Actions */}
          <div className="flex flex-1 items-center gap-3 sm:max-w-md sm:justify-end">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border focus:border-primary"
              />
            </div>
            <Button onClick={onAddMovie} size="sm" className="shrink-0">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Movie</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}