function joinRoom(roomName) {
	// Send/emit this room to server!
	nsSocket.emit('joinRoom', roomName, (newNumberOfMembers) => {
		// we want to update the room member total now that we have joined
		document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`
		document.querySelector('.curr-room-text').innerText = `${roomName}`
	})

	nsSocket.on('historyCatchUp', history => {
		const messageUl = document.querySelector('#messages')
		messageUl.innerHTML = ''
		history.forEach(message => {
			const newMessage = buildHtml(message)
			const currentMsg = messageUl.innerHTML
			messageUl.innerHTML = currentMsg + newMessage
		});
		messageUl.scrollTo(0, messageUl.scrollHeight)
	})
}

/*
roomName == New Articles
*/