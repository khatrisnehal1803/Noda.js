import { create } from 'zustand';

// Sample movie posters (placeholder URLs)
const samplePosters = [
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
];

const initialMovies = [
  {
    id: "1",
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: "Action",
    releaseYear: 2008,
    posterUrl: samplePosters[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: "Sci-Fi",
    releaseYear: 2010,
    posterUrl: samplePosters[1],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: "Sci-Fi",
    releaseYear: 2014,
    posterUrl: samplePosters[2],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: "Drama",
    releaseYear: 1994,
    posterUrl: samplePosters[3],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useMovieStore = create((set, get) => ({
  movies: initialMovies,
  searchQuery: "",
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  addMovie: (data) => {
    const newMovie = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      genre: data.genre,
      releaseYear: data.releaseYear,
      posterUrl: data.posterUrl || samplePosters[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({ movies: [...state.movies, newMovie] }));
    return newMovie;
  },
  
  updateMovie: (id, data) => {
    let updatedMovie = null;
    
    set((state) => ({
      movies: state.movies.map((movie) => {
        if (movie.id === id) {
          updatedMovie = {
            ...movie,
            title: data.title,
            description: data.description,
            genre: data.genre,
            releaseYear: data.releaseYear,
            posterUrl: data.posterUrl || movie.posterUrl,
            updatedAt: new Date(),
          };
          return updatedMovie;
        }
        return movie;
      }),
    }));
    
    return updatedMovie;
  },
  
  deleteMovie: (id) => {
    const movieExists = get().movies.some((m) => m.id === id);
    if (movieExists) {
      set((state) => ({
        movies: state.movies.filter((movie) => movie.id !== id),
      }));
      return true;
    }
    return false;
  },
  
  getMovieById: (id) => {
    return get().movies.find((movie) => movie.id === id);
  },
  
  getFilteredMovies: () => {
    const { movies, searchQuery } = get();
    if (!searchQuery.trim()) return movies;
    
    const query = searchQuery.toLowerCase();
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
  },
}));