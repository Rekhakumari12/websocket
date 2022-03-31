function joinRoom(roomName) {
	// Send/emit this room to server!
	nsSocket.emit('joinRoom', roomName, (newNumberOfMembers) => {
		// we want to update the room member total now that we have joined
		document.querySelector('.curr-room-num-users').innerHTML += `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`
	})
}

/*
roomName == New Articles
*/