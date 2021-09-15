// Include Node.js modules
const express = require('express');
const bodyParser = require('body-parser');
const superagent = require('superagent');
const ejs = require('ejs');
const lodash = require('lodash');

// Create an object of the express module
const app = express();

// Define future variables
let cocktails;
let notCocktails;
let eachRecipe;
const filterUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?"
const recipeURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?"
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Set variable 'port' to the port provided by the environment
// Set variable 'port' to 3000 if no port is being provided
const port = process.env.PORT || 3000;

// Get HTTP-response from "filterUrl" with the query parameter "c=Cocktail" and save it to "cocktails"
superagent.get(filterUrl)
    .query({c:'Cocktail'})
    .end((err, response) => {
        if (err) { return console.log(err); }
        cocktails = response.body.drinks;

    });

// Get HTTP-response from "filterUrl" with the query parameter "a=Non_Alcoholic" and save it to "notCocktails"
superagent.get(filterUrl)
    .query({a:'Non_Alcoholic'})
    .end((err, response) => {
        if (err) { return console.log(err); }
        notCocktails = response.body.drinks;
    });

// set the view engine of the express application to ejs
app.set('view engine', 'ejs');

// Render home.ejs when user enters website
app.get('/',(req, res) => {
    res.render("home");
})

// Render about.ejs when user enters "/about"
app.get('/about',(req, res) => {
    res.render("about");
})

// Render alcoholic.ejs when user enters "/alcoholic"
app.get('/alcoholic',(req, res) => {
    res.render("alcoholic", {cocktails: cocktails});
})

// Render non_alcoholic.ejs when user enters "/non_alcoholic"
app.get('/non_alcoholic',(req, res) => {
    res.render("non_alcoholic", {notCocktails: notCocktails});
})

// Lookup users recipe in API
// User sends the recipe name in ":recipe"
app.get('/recipes/:recipe', (req, res) => {
    // Loop through all recipes in "cocktails"
    cocktails.forEach(recipe => {
        // Check if current recipes name ("strDrink") is equal to users ":recipe"
        if (lodash.lowerCase(req.params.recipe) === lodash.lowerCase(recipe.strDrink)){
            // Get HTTP-response from "recipeURL" with the query parameter "i=idDrink"
            superagent.get(recipeURL)
                .query({i: recipe.idDrink})
                .end((err, response) => {
                    if (err) { return console.log(err); }
                    eachRecipe = response.body.drinks;
                    res.render('recipe' ,{recipe, eachRecipe:eachRecipe});
        })

    }})
    notCocktails.forEach(recipe => {
        if (lodash.lowerCase(req.params.recipe) === lodash.lowerCase(recipe.strDrink)){
            superagent.get(recipeURL)
                .query({i:recipe.idDrink})
                .end((err, response) => {
                    if (err) { return console.log(err); }
                    // Save the drinks api information to "eachRecipe"
                    eachRecipe = response.body.drinks;
                    // Render recipe.ejs with option parameters "recipe" and "eachRecipe"
                    res.render('recipe', {recipe, eachRecipe: eachRecipe});
                })
        }
    })
})

// export this module to make it accessible from other classes
module.exports = app; 

// Start listening the server on "port"
app.listen(port,()=>
    console.log("Server started on port " + port));