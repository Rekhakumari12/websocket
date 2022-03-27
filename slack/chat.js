const express = require('express');
const socketio = require('socket.io');
const app = express()

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(5500, () => {
	console.log('listening to port 5500')
})

const io = socketio(expressServer)
io.on('connection', (socket) => {
	// socket can emit to the entire namespace which is / if no namespace provied
	socket.emit("messageToClients", { data: "Welcome to socket.io server" })
	socket.on('messageFromClient', (data) => {
		console.log(data)
	})
	socket.join('level1')
	socket.to('level1').emit('joined', `${socket.id} says I have joined the level 1 room!`)

})

io.of('/admin').on('connection', (socket) => {
	io.of('/admin').emit('adminMessage', 'welcome to admin!')
})
