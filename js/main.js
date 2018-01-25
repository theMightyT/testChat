(function() {
	const socket = io(); // a constant is a variable that should never change (remains constant)
	//const nName = "julio";

	let messageList = document.querySelector('ul'),
		chatForm 	= document.querySelector('form'),
		nameInput	= document.querySelector('.nickname'),
		nickName 	= null,
		chatMessage = chatForm.querySelector('.message');

	function setNickname() {
		nickName = this.value;
	}

	function handleSendMessage(e) {
		e.preventDefault(); // kill form submit
		msg = nickName + ' says: ' + chatMessage.value;
		socket.emit('chat message', msg);
		chatMessage.value = '';
		return false;
	}

	function appendMessage(msg) {
		// will it get passed thru?
		debugger;
		let newMsg = document.createElement('li');
		newMsg.innerHTML = msg.message;
		messageList.appendChild(newMsg);
	}

	function appendDMessage(msg) {
		let newMsg = document.createElement('li');
		newMsg.innerHTML = msg;
		messageList.appendChild(newMsg);
	}

	nameInput.addEventListener('change', setNickname, false);

	chatForm.addEventListener('submit', handleSendMessage, false);
	socket.addEventListener('chat message', appendMessage, false);
	socket.addEventListener('disconnect message', appendDMessage, false);
})();