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

async function getCategoryForm(req,res){
    res.render("addCategory", {
        title: "Add Movie Category to Library",
    });
};

async function addCategory(req,res){
    const category_type=req.body.category_type;
    const categoryExists= await db.ifCategoryExists(category_type);
    if(!categoryExists){
        //insert category details to sql database
        await db.addCategory(category_type);
        res.redirect('/');
    }
    else {
        //need to add redirect page here
        res.redirect('/');
    }
};

async function deleteCategory(req,res){
    const categoryID=req.params.id;
    await db.deleteCategory(categoryID);
    res.redirect('/');
}

module.exports = {
    getAllCategories,
    getSelectedCategory,
    getCategoryForm,
    addCategory,
    deleteCategory
  };