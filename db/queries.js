const pool = require("./pool");


async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM movie_categories");
    return rows;
}

async function getSelectedCategory(categoryID){
    const {rows} = await pool.query("SELECT category_type FROM movie_categories WHERE id=$1",[categoryID]);
    return rows[0];
}

async function findCategoryID(category){
    const {rows} = await pool.query("SELECT id FROM movie_categories WHERE category_type=$1",[category]);
    console.log(rows);
    return rows[0].id;
}

async function getAllMovies() {
    const { rows } = await pool.query("SELECT * FROM movie_details");
    return rows;
}

async function getSelectedMovie(movieID){
    const {rows} = await pool.query("SELECT * FROM movie_details WHERE id=$1",[movieID]);
    return rows[0];
}

async function ifMovieExists(movie_title){
    const movieTitleCheck=String(movie_title).toLowerCase();
    const { rows } = await pool.query(
        'SELECT * FROM movie_details WHERE LOWER(movie_title) = $1',
        [movieTitleCheck]);
    if(rows[0]){
        return true;
    }
    return false;
}

async function ifCategoryExists(category_type){
    const categoryCheck=String(category_type).toLowerCase();
    const { rows } = await pool.query(
        'SELECT category_type FROM movie_categories WHERE LOWER(category_type) = $1',
        [categoryCheck]);
    if(rows[0]){
        return true;
    }
    return false;
}

async function getSelectedCategoryMovies (categoryID){
    const { rows } = await pool.query(
    "SELECT movie_details.movie_title AS movie_title, movie_details.id AS id FROM movie_details INNER JOIN movie_with_category ON movie_details.id=movie_with_category.movieid WHERE movie_with_category.categoryid=$1",[categoryID]);
    return rows;
}

async function addMovie(movie_title,movie_director,movie_year){
    const movie = await pool.query(
        "INSERT INTO movie_details (movie_title,movie_director,movie_year) VALUES ($1,$2,$3) RETURNING id", 
        [movie_title,movie_director,movie_year]);
    return movie;
}

async function addMovieCategoryPair(movie_id,category_id){
    await pool.query(
        "INSERT INTO movie_with_category (movieid,categoryid) VALUES ($1,$2)",
        [movie_id,category_id]);
}

async function deleteMovieCategories(movie_id){
    await pool.query(
        "DELETE FROM movie_with_category WHERE movieid=$1",
        [movie_id]);
}

async function addCategory(category_type) {
    await pool.query(
        "INSERT INTO movie_categories (category_type) VALUES ($1)",
        [category_type]);
}

async function getCategoriesFromMovieID(movieID){
    const {rows} = await pool.query(
        "SELECT categoryid FROM movie_with_category WHERE movieid=$1",
        [movieID]);
    return rows;
}

async function getMovieIDByTitle(movie_title){
    const {rows} = await pool.query(
        "SELECT id FROM movie_details WHERE movie_title=$1",
        [movie_title]);
    return rows[0].id;
}

async function updateMovieDetails(movieID,movieDirector,movieYear){
    await pool.query (
        "UPDATE movie_details SET movie_director=$2, movie_year=$3 WHERE id=$1",
        [movieID,movieDirector,movieYear]);
}

module.exports = {
    getAllCategories,
    getSelectedCategory,
    findCategoryID,
    getAllMovies,
    getSelectedMovie,
    getSelectedCategoryMovies,
    addMovie,
    ifMovieExists,
    ifCategoryExists,
    addMovieCategoryPair,
    deleteMovieCategories,
    addCategory,
    getCategoriesFromMovieID,
    getMovieIDByTitle,
    updateMovieDetails
};
  