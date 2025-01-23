const db = require('../db/queries');

async function generateIndexPage(req, res) {
    const categories = await db.getAllCategories();
    res.render("index", {
      title: "Movie inventory:",
      categories: categories,
    });
};


module.exports = {
    generateIndexPage
  };