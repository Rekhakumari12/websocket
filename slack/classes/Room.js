class Room {
	constructor(roomId, roomTitle, namespace, privateRoom = false) {
		this.roomId = roomId,
			this.roomTitle = roomTitle,
			this.namespace = namespace,
			this.privateRoom = privateRoom,
			this.history = []
	}
	addMessage(mesage) {
		this.history.push(mesage)
	}
	clearHistory() {
		this.history = []
	}
}
module.exports = Room;