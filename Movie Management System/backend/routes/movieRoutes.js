const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getAllMovies,
  getMovieById,
  searchMovies,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

router.get('/search', searchMovies);
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', upload.single('poster'), createMovie);
router.put('/:id', upload.single('poster'), updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
