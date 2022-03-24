const express = require('express');
const socketio = require('socket.io');
const app = express()

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(5500, () => {
	console.log('listening to port 5500')
})

// socket server listening to http server
const io = socketio(expressServer)

// on - listening, emit - send
io.on('connection', (socket) => {
	socket.on('messageFromClient', (data) => {
		io.emit("messageToClients", { data: data.text })
	})
})