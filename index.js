// initialize our app and tell it to use some plugins from the modules folder
var express = require('express');
var app 		= express();
var http 		= require('http').Server(app);
var io 			= require('socket.io')(http);

var port = process.env.PORT || 3000;

// some config stuff
// tell our app to serve css files from that folder
app.use(express.static('public'));

// send an html file instead of a string
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// plug in socket.io
io.on('connection', function(socket) {
	console.log('a user has connected');
	io.emit('chat message', { for: 'everyone', message: `${socket.id} is here to par TAY!!` });

	// listen for a message, and then send it where it needs to go
	socket.on('chat message', function(msg) {
		console.log('message: ', msg);

		// send a message event to all clients
		io.emit('chat message', { for: 'everyone', message: msg });
	});

	// listen for disconnet
	socket.on('disconnect', function() {
		console.log('a user disconnected');
		msg = `${socket.id} has left the building!`;
		io.emit('disconnect message', msg);
	});
});

// tell the app to be served up at this port (same as WAMP or MAMP, just a different port)
http.listen(port, function() {
	console.log(`listening on ${port}`);
});
