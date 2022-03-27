const socket = io("http://localhost:5500"); // redirect to / (default)endpoints 
const socket1 = io("http://localhost:5500/admin"); // /admin namespace

document.querySelector("#chat-form").addEventListener("submit", (e) => {
	e.preventDefault();
	const text = document.getElementById("user-message").value;
	socket.emit("messageFromClient", { text });
});

socket1.on('adminMessage', (data) => {
	console.log(data)
})
socket.on('joined', (d) => {
	console.log(d)
})
socket.on("messageToClients", (dataFromServer) => {
	socket.emit('')
	document.getElementById("message").innerHTML += `<li>${dataFromServer.data}</li>`;
});
