(function() {
	//const socket = io(); // a constant is a variable that should never change (remains constant)
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
		nickName = (nickName && nickName.length > 0) ? nickName : 'user';
		msg = `${nickName} says ${chatMessage.value}`;

		socket.emit('chat message', msg);
		chatMessage.value = '';
		return false;
	}

	function appendMessage(msg) {
		// will it get passed thru?
		debugger;
		let newMsg = `<li>${msg.message}</li>`
		messageList.innerHTML += newMsg;
	}

	function appendDMessage(msg) {
		let newMsg = `<li>${msg}</li>`
		messageList.innerHTML += newMsg;
	}

	// try a test query and see if we get anything back

	function testFetch() {
		console.log('trying fetch');
		
		let url = "/api";

		fetch(url)
			.then(res => res.json())
			.then(data => console.log(data))
		.catch((error) => console.log(error));
	}

	nameInput.addEventListener('change', setNickname, false);
	chatForm.addEventListener('submit', handleSendMessage, false);
	//socket.addEventListener('chat message', appendMessage, false);
	//socket.addEventListener('disconnect message', appendDMessage, false);

	testFetch();
})();
