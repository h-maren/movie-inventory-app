const pool = require("./pool");


async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM movie_categories");
    return rows;
}

async function getSelectedCategory(categoryID){
    const {rows} = await pool.query("SELECT category_type FROM movie_categories WHERE id=$1",[categoryID]);
    return rows[0];
}

async function getAllMovies() {
    const { rows } = await pool.query("SELECT * FROM movie_details");
    return rows;
}

async function getSelectedMovie(movieID){
    const {rows} = await pool.query("SELECT * FROM movie_details WHERE id=$1",[movieID]);
    return rows[0];
}

async function getSelectedCategoryMovies (categoryID){
    const { rows } = await pool.query(
    "SELECT movie_details.movie_title AS movie_title, movie_details.id AS id FROM movie_details INNER JOIN movie_with_category ON movie_details.id=movie_with_category.movieid WHERE movie_with_category.categoryid=$1",[categoryID]);
    return rows;
}

module.exports = {
    getAllCategories,
    getSelectedCategory,
    getAllMovies,
    getSelectedMovie,
    getSelectedCategoryMovies
};
  