const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const port = 3000;
const ejs = require('ejs');

app.get('/',(req, res) => {
    res.send('what up cocktail people');
})






app.listen(port,()=>
    console.log("Server started on port 3000"))