const socket = io("http://localhost:5500"); // redirect to / (default)endpoints 
const socket1 = io("http://localhost:5500/admin"); // /admin namespace

/*socket.on('connect', () => {
	console.log(socket.id)
})*/

// these 2 diff sockets won't be able to talk to each other

/*socket1.on('connect', () => {
	console.log(socket1.id)
})*/

document.querySelector("#chat-form").addEventListener("submit", (e) => {
	e.preventDefault();
	const text = document.getElementById("user-message").value;
	socket.emit("messageFromClient", { text });
});
socket.on("messageToClients", (dataFromServer) => {
	document.getElementById("message").innerHTML += `<li>${dataFromServer.data}</li>`;
});
socket1.on("adminMessage", (data) => {
	console.log(data)
})