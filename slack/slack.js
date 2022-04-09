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
	socket.emit('nslist', nsData)
})

// loop thru each namespace and listen to connection
namespaces.forEach((namespace) => {
	io.of(namespace.endpoint).on('connection', (nsSocket) => {

		// a socket it connected to one of our chatgroup namespaces.
		// send that namesapce group info back

		nsSocket.emit('onRoomLoad', namespaces[0].room)
		nsSocket.on("joinRoom", async (roomName, numOfUserCallback) => {
			// deal with history one we have it
			nsSocket.join(roomName)
			const clients = await io.of('/wiki').in(roomName).allSockets()
			// send as ackowledgment to joinRoom event
			await numOfUserCallback(Array.from(clients).length)
			nsSocket.on("newMessageToServer", (msg) => {
				const fullMsg = {
					text: msg.text,
					time: Date.now(),
					username: 'rbunch',
					avatar: 'https://via.placeholder.com/30'
				}
				console.log(fullMsg)
				console.log(nsSocket.rooms) // Set(2) { 'yfhjkfH5hV9mGGrIAAAY', 'New Articles' }
				const roomTitle = Array.from(nsSocket.rooms)[1]
				io.of('/wiki').to(roomTitle).emit('messageToClient', fullMsg)

			})
		})

		console.log(`${nsSocket.id} has joined ${namespace.endpoint} \n -----------------------------------`)
	})
})


/*
1. joined the main namespace
2. sent back ns info to client
3. listen for ns, updated the DOM
*/

/*
namespaces = [{Namespace, wiki}, {Namespace, mozilla}, {Namespace, firefox}]
namesapces[0] = Namespace {id: 0, endpoint: '/wiki', room: [ [Room], [Room], [Room] ] },
namespace[0].room = [ [Room, New Articles], [Room, Editors], [Room, Other] ]
*/

/*
io.of('/wiki').in(roomName).allSockets().then((clients) => {
	console.log(Array.from(clients)) // Set(1) { 'U0w2_wsx-KwqD0cGAAAE' } -> [ 'gHK4juEXcvNbJ9mAAAAB' ]
	console.log(Array.from(clients).length)
})
*/

