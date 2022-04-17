const joinNs = (endpoint) => {
	if (nsSocket) {
		// check to see if socket is actualy a socket
		nsSocket.close()
		// remove the event listener before its added
		document.querySelector('#user-input').removeEventListener('submit', formSubmission)
	}
	nsSocket = io(`http://localhost:5500${endpoint}`);

	nsSocket.on('onRoomLoad', (nsRooms) => {
		let roomList = document.querySelector('.room-list')
		roomList.innerHTML = ""
		nsRooms.forEach(room => {
			const glyph = (!room.privateRoom) ? "globe" : "lock"
			roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`
		});
		// add click listner to each room
		let roomNode = document.getElementsByClassName('room')
		Array.from(roomNode).forEach(ele => {
			ele.addEventListener('click', () => {
				// console.log('someone clicked', ele.innerText)
				joinRoom(ele.innerText)
			})
		})

		// add room automatically.. first time here
		// querySelector will only fetch the first element with class .room from line no 8
		const topRoom = document.querySelector('.room')
		const topRoomName = topRoom.innerText
		joinRoom(topRoomName)
	})
	nsSocket.on("messageToClient", msg => {
		console.log(msg)
		const newMsg = buildHtml(msg)
		document.querySelector('#messages').innerHTML += newMsg
	})
	document.querySelector('.message-form').addEventListener('submit', formSubmission)
}

function formSubmission(e) {
	e.preventDefault()
	const userMessage = document.querySelector('#user-message').value
	nsSocket.emit("newMessageToServer", { text: userMessage })
}

function buildHtml(msg) {
	const convertedDate = new Date(msg.time).toLocaleString()
	const newHtml = `<li>
							<div class="user-image">
								<img src="${msg.avatar}" />
							</div>
							<div class="user-message">
								<div class="user-name-time">${msg.username}<span>${convertedDate}</span></div>
								<div class="message-text">${msg.text}</div>
							</div>
						</li>`
	return newHtml
}