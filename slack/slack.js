const express = require('express');
const socketio = require('socket.io');
const namespaces = require('./data/namespaces')
const app = express()
app.use(express.static(__dirname + '/public'))
const expressServer = app.listen(5500, () => {
	console.log('listening to port 5500')
})
const io = socketio(expressServer)

io.on('connection', (socket) => {
	// build an array to send back with the img and endpoint with the ns
	let nsData = namespaces.map((ns) => {
		return {
			img: ns.img,
			endpoint: ns.endpoint
		}
	})
	// send the data back to client we need to use socket, NOT the io, because we want it to go to just this client
	// console.log(nsData)
	socket.emit('nslist', nsData)
})
// loop thru each namespace and listen to connection
namespaces.forEach((namespace) => {
	io.of(namespace.endpoint).on('connection', (socket) => {
		console.log(`${socket.id} has joined ${namespace.endpoint}`)
	})
})


/*
1. joined the main namespace
2. sent back ns info to client
3. listen for ns, updated the DOM

 */