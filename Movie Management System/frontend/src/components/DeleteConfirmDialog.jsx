import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

export function DeleteConfirmDialog({
  movie,
  open,
  onClose,
  onConfirm,
}) {
  if (!movie) return null;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-card border-border">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <Trash2 className="h-6 w-6 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center text-foreground">
            Delete "{movie.title}"?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action cannot be undone. This will permanently delete the movie
            and its poster from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-3">
          <AlertDialogCancel className="bg-secondary border-border text-foreground hover:bg-muted">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete Movie
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}