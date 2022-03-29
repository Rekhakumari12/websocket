const socket = io("http://localhost:5500");
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
			let nsElement = e.getAttribute("ns")
			console.log(nsElement)
		})
	})
	joinNs('/wiki')
});
