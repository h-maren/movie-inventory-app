const pool = require("./pool");


async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM movie_categories");
    return rows;
}

async function getAllMovies() {
    const { rows } = await pool.query("SELECT * FROM movie_details");
    return rows;
}

module.exports = {
    getAllCategories,
    getAllMovies
};
  