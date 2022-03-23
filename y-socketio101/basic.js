// we need http because we dont have express
const http = require('http')
// we need socket.io.. its 3rd party
const socketio = require('socket.io')

// we make http server with node
const server = http.createServer((req, res) => {
	res.end("I am connect!")
})

const io = socketio(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
})

io.on('connection', (socket, req) => {
	// ws.send -> socket.emit
	socket.emit('welcome', "server side se data aaya")
	socket.on('message', (msg) => {
		console.log(msg)
	})
})
server.listen(5050)