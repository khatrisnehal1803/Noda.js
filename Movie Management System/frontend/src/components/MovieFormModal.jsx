import { useEffect, useState } from "react";
import { GENRES } from "@/types/movie";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Film } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const movieSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description too long"),
  genre: z.string().min(1, "Please select a genre"),
  releaseYear: z.coerce
    .number()
    .min(1888, "Invalid year")
    .max(new Date().getFullYear() + 5, "Year too far in future"),
});

export function MovieFormModal({
  movie,
  open,
  onClose,
  onSave,
}) {
  const isEditing = !!movie;
  const [posterPreview, setPosterPreview] = useState(null);
  const [posterFile, setPosterFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      description: "",
      genre: "",
      releaseYear: new Date().getFullYear(),
    },
  });

  useEffect(() => {
    if (movie) {
      reset({
        title: movie.title,
        description: movie.description,
        genre: movie.genre,
        releaseYear: movie.releaseYear,
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPosterPreview(movie.posterUrl);
    } else {
      reset({
        title: "",
        description: "",
        genre: "",
        releaseYear: new Date().getFullYear(),
      });
      setPosterPreview(null);
    }
    setPosterFile(null);
  }, [movie, reset, open]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const formData = {
      title: data.title,
      description: data.description,
      genre: data.genre,
      releaseYear: data.releaseYear,
      posterFile,
      posterUrl: posterPreview || undefined,
    };
    onSave(formData);
    onClose();
    toast.success(isEditing ? "Movie updated!" : "Movie added!");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Film className="h-5 w-5 text-primary" />
            {isEditing ? "Edit Movie" : "Add New Movie"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Poster Upload */}
          <div className="space-y-2">
            <Label className="text-foreground">Movie Poster</Label>
            <div className="flex items-start gap-4">
              <div className="relative w-24 h-36 rounded-lg overflow-hidden bg-secondary border border-dashed border-border">
                {posterPreview ? (
                  <>
                    <img
                      src={posterPreview}
                      alt="Poster preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPosterPreview(null);
                        setPosterFile(null);
                      }}
                      className="absolute top-1 right-1 p-1 rounded-full bg-background/80 hover:bg-background transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-secondary border-border"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Title</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter movie title"
              className="bg-secondary border-border"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Genre & Year */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Genre</Label>
              <Select
                defaultValue={movie?.genre || ""}
                onValueChange={(value) => setValue("genre", value)}
              >
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.genre && (
                <p className="text-sm text-destructive">{errors.genre.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="releaseYear" className="text-foreground">Release Year</Label>
              <Input
                id="releaseYear"
                type="number"
                {...register("releaseYear")}
                placeholder="2024"
                className="bg-secondary border-border"
              />
              {errors.releaseYear && (
                <p className="text-sm text-destructive">{errors.releaseYear.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Write a brief description..."
              rows={4}
              className="bg-secondary border-border resize-none"
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isEditing ? "Save Changes" : "Add Movie"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}