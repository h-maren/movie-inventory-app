const { Router } = require("express");
const indexRouter= Router(); 
const categoryController = require("../controllers/categoryController");
const movieController = require("../controllers/movieController");
const indexController = require('../controllers/indexController');



indexRouter.get("/", indexController.generateIndexPage);
indexRouter.get("/viewAllCategories",categoryController.getAllCategories);
indexRouter.get("/viewAllMovies",movieController.getAllMovies);

indexRouter.get("/category/:id", categoryController.getSelectedCategory);
indexRouter.get("/movie/:id", movieController.getSelectedMovieDetails);

indexRouter.get("/getMovieForm",movieController.getMovieForm);
indexRouter.post('/addOrEditMovie',movieController.addOrEditMovie);

indexRouter.get('/edit/:id',movieController.editMovieForm);

indexRouter.get("/addCategoryForm",categoryController.getCategoryForm);
indexRouter.post("/addCategory",categoryController.addCategory);


module.exports = indexRouter;