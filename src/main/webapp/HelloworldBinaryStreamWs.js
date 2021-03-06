/**
 * 
 */
var webSocket = new WebSocket("ws://192.168.0.5:8080/WebsocketSample/hello");
webSocket.binaryType = "arraybuffer";

function sendMsg() {
	let textToSend = document.getElementById("messageField").value;
	let fileToSend = document.getElementById("file").files[0];
	let msgToSend = null;
	var divMsg = document.getElementById("msg-box");
	if ( textToSend !== "") {		
		msgToSend = textToSend;
		document.getElementById("messageField").value = "";
	} else {		
		msgToSend = fileToSend;
	}
	if (webSocket !== null) {		
		webSocket.send(msgToSend);		
	} else {
		alert("Connection lost!!!");
	}
}
// public method for encoding an Uint8Array to base64
function encode(input) {
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;

	while (i < input.length) {
		chr1 = input[i++];
		chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the
		// index
		chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed
		// here

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output += keyStr.charAt(enc1) + keyStr.charAt(enc2)
				+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
	}
	return output;
}

webSocket.onmessage = function(evt) {
	onmessage(evt)
}

function onmessage(evt) {
	if (typeof evt.data === "string") {		
		drawText(evt.data);
	} else {		
		drawBinary(evt.data);
	}
}
function drawText(text) {
	console.log("received text" + text);	
	var divMsg = document.getElementById("msg-box");
	divMsg.innerHTML += " \n" + text + " <br>";
}

function drawBinary(message) {	
	console.log(String.fromCharCode.apply(null, new Uint16Array(message)));
	var divMsg = document.getElementById("msg-box");
	var elem = document.createElement("img");
	elem.setAttribute("alt", "not available");
	var arrayBuffer = message;
	var bytes = new Uint8Array(arrayBuffer);
	elem.src = 'data:image/png;base64,' + encode(bytes);
	document.getElementById("msg-box").appendChild(elem);
}

webSocket.onopen = function() {
	alert('connection opened');
};

webSocket.onclose = function() {
	alert("connection closed");
}

webSocket.onerror = function wserror(message) {
	console.log("error: " + message);
	alert("error " + message);
}