/**
 * 
 */
var webSocket = new WebSocket("ws://192.168.0.2:8080/WebsocketSample/hello");
function sendMsg() {	
	var msgToSend = document.getElementById("messageField").value;	
	//let msgToSend = document.getElementById("file").files[0];	
	//alert(photo);
	if(webSocket!==null){
		webSocket.send(msgToSend);
		divMsg.innerHTML += "<div style='color:red'>" + msgToSend
				+ "</div>";
		document.getElementById("messageField").value = "";
	}else{
		webSocket = new WebSocket("ws://192.168.0.2:8080/WebsocketSample/hello");
		webSocket.send(msgToSend);
		divMsg.innerHTML += "<div style='color:red'>" + msgToSend
				+ "</div>";
		document.getElementById("messageField").value = "";
	}	
}

webSocket.onmessage = function(message) {
	var divMsg = document.getElementById("msg-box");
	divMsg.innerHTML +=" \n"+ message.data+" <br>";
}

webSocket.onopen = function() {
	alert('connection opened');
};

webSocket.onclose = function() {
	alert("connection closed");
}

webSocket.onerror = function wserror(message) {
	console.log("error: " + message);
}