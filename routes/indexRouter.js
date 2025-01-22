const { Router } = require("express");
const indexRouter= Router(); 
const categoryController = require("../controllers/categoryController");
const movieController = require("../controllers/movieController");



indexRouter.get("/", (req, res) => {
    res.render('index', {title: 'Movie Inventory'});
});

indexRouter.get("/viewAllCategories",categoryController.getAllCategories);
indexRouter.get("/viewAllMovies",movieController.getAllMovies);


module.exports = indexRouter;