const db = require('../db/queries');

async function getAllMovies(req, res) {
    const movies = await db.getAllMovies();
    res.render("movies", {
      title: "All movies:",
      movies: movies,
    });
};

async function getSelectedMovieDetails(req,res){
    const movieID=req.params.id;
    const movie = await db.getSelectedMovie(movieID);
    res.render("movie", {
        movie: movie
    });
};


module.exports = {
    getAllMovies,
    getSelectedMovieDetails
  };