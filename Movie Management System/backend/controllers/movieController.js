const Movie = require('../models/Movie');
const fs = require('fs');
const path = require('path');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchMovies = async (req, res) => {
  try {
    const { q } = req.query;
    const movies = await Movie.find({
      title: { $regex: q, $options: 'i' }
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movieData = {
      ...req.body,
      posterUrl: req.file ? `/uploads/${req.file.filename}` : ''
    };
    const movie = new Movie(movieData);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    
    const updateData = { ...req.body };
    if (req.file) {
      if (movie.posterUrl) {
        const oldPath = path.join(__dirname, '..', movie.posterUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.posterUrl = `/uploads/${req.file.filename}`;
    }
    
    const updated = await Movie.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    
    if (movie.posterUrl) {
      const posterPath = path.join(__dirname, '..', movie.posterUrl);
      if (fs.existsSync(posterPath)) fs.unlinkSync(posterPath);
    }
    
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
