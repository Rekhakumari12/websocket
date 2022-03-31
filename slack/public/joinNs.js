const joinNs = (endpoint) => {
	nsSocket = io(`http://localhost:5500${endpoint}`);

	nsSocket.on('onRoomLoad', (nsRooms) => {
		let roomList = document.querySelector('.room-list')
		roomList.innerHTML = ""
		nsRooms.forEach(room => {
			const glyph = (!room.privateRoom) ? "globe" : "lock"
			roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`
		});

		let roomNode = document.getElementsByClassName('room')
		Array.from(roomNode).forEach(ele => {
			ele.addEventListener('click', () => {
				console.log('someone clicked', ele.innerText)
			})
		})

		// add room automatically.. first time here
		// querySelector will only fetch the first element with class .room from line no 8
		const topRoom = document.querySelector('.room')
		const topRoomName = topRoom.innerText
		joinRoom(topRoomName)
	})
}