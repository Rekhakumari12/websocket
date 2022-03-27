const socket = io("http://localhost:5500"); // redirect to / (default)endpoints 
const socket1 = io("http://localhost:5500/wiki"); // /admin namespace
const socket2 = io("http://localhost:5500/mozilla"); // /mozila namespace
const socket3 = io("http://localhost:5500/linux"); // /linux namespace
// listen for ns which is a list of all namespaces
socket.on("nslist", (nsList) => {
	let namespacesDiv = document.querySelector('.namespaces')
	namespacesDiv.innerHTML = ""
	nsList.forEach(element => {
		namespacesDiv.innerHTML += `<div class="namespace" ns="${element.endpoint}"><img src="${element.img}"/></div>`
	});
	// add clickListner to each namespace, updating the DOM with NS
	Array.from(document.getElementsByClassName('namespace')).forEach((e) => {
		e.addEventListener('click', () => {
			console.log(e)
			let nsElement = e.getAttribute("ns")
		})
	})
});
