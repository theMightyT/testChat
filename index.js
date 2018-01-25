// initialize our app and tell it to use some plugins from the modules folder
var express = require('express');
var mustache = require('mustache');
var app 	= express();
var http 	= require('http').Server(app);
var io 		= require('socket.io')(http);

// some config stuff
// tell our app to serve css files from that folder
app.use(express.static('public'));
//app.use("/styles",  express.static('css'));
//app.use('/script', express.static('js'));

// simple routing -> catch the 'root' route and send this message along
// app.get('/', function(req, res) {
// 	res.send('<h1>Hello World!</h1>');
// });

// send an html file instead of a string
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// plug in socket.io
io.on('connection', function(socket) {
	//console.log(socket);

	// listen for a message, and then send it where it needs to go
	socket.on('chat message', function(msg) {
		console.log('message: ', msg);

		// send a message event to all clients
		io.emit('chat message', { for: 'everyone', message: msg });
	});

	// listen for disconnet
	socket.on('disconnect', function() {
		console.log('a user disconnected');
		msg = socket.id + ' has left the building!'
		io.emit('disconnect message', msg);
	});
});

// tell the app to be served up at this port (same as WAMP or MAMP, just a different port)
http.listen(3000, function() {
	console.log('listening on localhost:3000');
});
