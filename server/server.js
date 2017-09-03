'use strict'
const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');

nunjucks.configure('./client/dist/',{
    autoescape: true,
    express: app
});

app.get('/',function(req,res) {
    res.render('index.html');
});
app.listen(7777,() =>  {
    console.log('server started on port 7777');
});