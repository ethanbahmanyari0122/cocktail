const express = require('express');
const bodyParser = require('body-parser');
const superagent = require('superagent');
const ejs = require('ejs');
const lodash = require('lodash');

const app = express();
let cocktails;
let notCocktails;
let eachRecipe;
const alcoholicURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?"
const nonAlcoholicURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
const recipeURL = "www.thecocktaildb.com/api/json/v1/1/lookup.php?"
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const port = process.env.PORT || 3000;

superagent.get(alcoholicURL)
    .query({c:'Cocktail'})
    .end((err, response) => {
        if (err) { return console.log(err); }
        cocktails = response.body.drinks;

    });
superagent.get(nonAlcoholicURL)
    .query({a:'Non_Alcoholic'})
    .end((err, response) => {
        if (err) { return console.log(err); }
        notCocktails = response.body.drinks;
    });

app.set('view engine', 'ejs');

app.get('/',(req, res) => {
    res.render("home");
})

app.get('/about',(req, res) => {
    res.render("about");
})

app.get('/alcoholic',(req, res) => {
    res.render("alcoholic", {cocktails: cocktails});
})

app.get('/non_alcoholic',(req, res) => {
    res.render("non_alcoholic", {notCocktails: notCocktails});
})

app.get('/recipes/:recipe', (req, res) => {
    cocktails.forEach(recipe => {
        if (lodash.lowerCase(req.params.recipe) === lodash.lowerCase(recipe.strDrink)){
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
                    if (err) {
                        return console.log(err);
                    }
                    eachRecipe = response.body.drinks;
                    res.render('recipe', {recipe, eachRecipe: eachRecipe});
                })

        }
    })
})



module.exports = app; 


app.listen(port,()=>
    console.log("Server started on port 3000"));