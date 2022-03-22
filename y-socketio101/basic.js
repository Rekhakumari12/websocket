// we need http because we dont have express
const http = require('http')
// we need socket.io.. its 3rd party
const socketio = require('socket.io')

// we make http server with node
const server = http.createServer((req, res) => {
	res.end("I am connect!")
})

const io = socketio(server)

io.on('connection', (socket, req) => {
	// ws.send -> socket.emit
	socket.emit("Mera Websocket! ban gya bhaiii")
	socket.on('mera event 😁', (msg) => {
		console.log(msg.toString())
	})
})
server.listen(8000)