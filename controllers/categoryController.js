const db = require('../db/queries');

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories();
    console.log(categories);
    res.render("categories", {
      title: "All categories:",
      categories: categories,
    });
};

module.exports = {
    getAllCategories
  };