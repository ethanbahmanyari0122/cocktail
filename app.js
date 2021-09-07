const express = require('express');
const bodyParser = require('body-parser');
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

app.get('/contact',(req, res) => {
    res.render("contact");
})

module.exports = app; 



app.listen(port,()=>
    console.log("Server started on port 3000"))