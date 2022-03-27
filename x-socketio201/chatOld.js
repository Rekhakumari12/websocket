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
	socket.on('messageFromClient', (data) => {

		// io.emit("messageToClients", { data: data.text })
		// same as above commented with namspace 

		io.of('/').emit("messageToClients", { data: data.text })
	})

	/*
		the server(main namespace) still have the ability to communicate with whatever namespaces it wishes. bcs server has access to evrything
		but on the clientInformation the server need to be in That namspace
		in order to get the events
	*/

	setTimeout(() => {
		io.of('/admin').emit('adminMessage', 'welcome to admin! from main channel')
	}, 1000)


})
// its a same thing like above 
io.of('/admin').on('connection', (socket) => {
	io.of('/admin').emit('adminMessage', 'welcome to admin!')
})
/*
Namespaces works only on server side
io means entire server
io.of('/admin') from entire server call admin namespace one room
*/