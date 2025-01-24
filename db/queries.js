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

async function ifMovieExists(movie_title,movie_director,movie_year){
    const { rows } = await pool.query(
        'SELECT * FROM movie_details WHERE movie_title=$1 AND movie_director=$2 AND movie_year=$3',
        [movie_title,movie_director,movie_year]);
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

async function addMovieCategory(movie_id,category_id){
    await pool.query(
        "INSERT INTO movie_with_category (movieid,categoryid) VALUES ($1,$2)",
        [movie_id,category_id]);
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
    addMovieCategory
};
  