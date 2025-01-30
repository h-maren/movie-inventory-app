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
    const categoryIDs = await db.getCategoriesFromMovieID(movieID);
    let categoryTypes=[];
    for (category of categoryIDs){
        const categoryType = await db.getSelectedCategory(category.categoryid);
        categoryTypes.push(categoryType.category_type);
    }
    res.render("movie", {
        movie: movie,
        categoryTypes: categoryTypes
    });
};

async function getMovieForm(req,res){
    const categories = await db.getAllCategories();
    res.render("addMovie", {
        title: "Add Movie to Library",
        categories: categories,
    });
};

async function editMovieForm(req,res){
    const movieID=req.params.id;
    const movie = await db.getSelectedMovie(movieID);
    const categories = await db.getAllCategories();
    const moviescategories = await db.getCategoriesFromMovieID(movieID);
    res.render("addMovie", {
        title: "Edit Movie in Library",
        categories: categories,
        movie: movie,
        moviescategories: moviescategories
    });
};

async function addMovie(req,res){
    const movie_title=req.body.movie_title;
    const movie_director=req.body.movie_director;
    const movie_year=req.body.movie_year;
    const movieExists= await db.ifMovieExists(movie_title,movie_director,movie_year);
    const movieCategories=req.body.category;
    if(!movieExists){
        //insert movie details to sql database
        const {rows} = await db.addMovie(movie_title,movie_director,movie_year);
        const movieID = rows[0].id;
        //insert movie-category pairs
        for(let i=0; i<movieCategories.length; i++){
            const categoryID = await db.findCategoryID(movieCategories[i]);
            await db.addMovieCategory(movieID,categoryID)
        }
        res.redirect('/');
    }
    else {
        //need to add redirect page here
        res.redirect('/');
    }
};

module.exports = {
    getAllMovies,
    getSelectedMovieDetails,
    getMovieForm,
    addMovie,
    editMovieForm
  };