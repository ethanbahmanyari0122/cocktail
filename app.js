const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const port = process.env.PORT || 3000;
//const ejs = require('ejs');

app.get('/',(req, res) => {
    res.sendFile(__dirname+'/Data.html');
})

app.get('/about',(req, res) => {
    res.sendFile(__dirname+'/Aboutus.html');
})



app.listen(port,()=>
    console.log("Server started on port 3000"))