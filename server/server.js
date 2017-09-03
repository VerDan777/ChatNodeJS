'use strict'
const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const server = require('http').Server(app);
const io = require('socket.io')(server,{serveClient:true});
const mongoose = require('mongoose');
const bluebird = require('blue')

mongoose.connect('mongodb://localhost:27017/chat');
    mongoose.Promise = require('bluebird');

nunjucks.configure('./client/views/',{
    autoescape: true,
    express: app
});
app.use('/assets',express.static('./client/public'));

app.get('/',function(req,res) {
    res.render('index.html');
});
io.on('connection',function(socket) {
    socket.emit('connected',"You are connected");
    socket.join('all');
    socket.on('msg',content => {
        const obj= {
            date: new Date(),
            content: content,
            username: socket.id
        }
        socket.emit("message",obj);
        socket.to('all').emit('message',obj);
    })
})
server.listen(7777,() =>  {
    console.log('server started on port 7777');
});