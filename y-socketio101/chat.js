const express = require('express');
const socketio = require('socket.io');
const app = express()

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(5500, () => {
	console.log('listening to port 5500')
})

// socket server listening to http server
const io = socketio(expressServer)

io.on('connection', (socket) => {
	socket.emit('messageFromServer', { data: 'This is from server' })
	socket.on('messageToServer', (dataFromClient) => {
		console.log(dataFromClient)
	})
})