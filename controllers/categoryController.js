const db = require('../db/queries');

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories();
    res.render("categories", {
      title: "All categories:",
      categories: categories,
    });
};

async function getSelectedCategory(req,res) {
    const categoryID=req.params.id;
    const selectedMovies = await db.getSelectedCategoryMovies(categoryID);
    const selectedCategory = await db.getSelectedCategory(categoryID);
    res.render("category", {
        category: selectedCategory.category_type,
        movies: selectedMovies
    })
}

module.exports = {
    getAllCategories,
    getSelectedCategory
  };