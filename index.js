var express = require('express');
var app = express();
var hbs = require('hbs');
app.set('view engine', 'hbs');

// app.set("port", process.env.PORT || 8080);
app.set('view engine', 'hbs');
app.set('trust proxy', 1)

var server =  require('http').createServer(app);      // import http and create a server
var io = require('socket.io').listen(server);         // attach socket.io to the server


// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM
server.listen(process.env.PORT || 8080);              // listen for incoming connections

// -------------- variables  -------------- //
var button_count = 0;
var saved = [];
var count = 0;


app.get("/", function(req, res){
    // var p = req.query.p;
    res.render('pong', {p : count});
    count = (count + 1) % 2;
});


var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});

// -------------- socket initialization -------------- //
io.on('connection',function(socket){                  // called when a new socket connection is made

    console.log('new socket connection');
        
    socket.on('client_evt', function(obj){            // server side socket callbacks for events
        if (obj.start_game_){
            io.emit('server_msg', {start_game_2 : true});
        }
        else{
            // console.log('client message!');
            mover = obj.player;
            move_x = obj.val;
            // socket.emit('server_msg', button_count++); // server-side emit just to this client
            io.emit('server_msg', {mover : mover, move_x : move_x});        // server server-side emit to all clients
        }
    })

})




