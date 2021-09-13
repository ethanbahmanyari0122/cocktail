const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const port = process.env.PORT || 3000;
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.get('/',(req, res) => {
    res.render("home");
})

app.get('/about',(req, res) => {
    res.render("about");
})

app.get('/alcoholic',(req, res) => {
    res.render("alcoholic");
})

app.get('/non_alcoholic',(req, res) => {
    res.render("non_alcoholic");
})

app.get('/recipe',(req, res) => {
    res.render("recipe");
})

module.exports = app; 


app.listen(port,()=>
    console.log("Server started on port 3000"))