/**
 * 
 */
var webSocket = new WebSocket("ws://192.168.0.2:8080/WebsocketSample/hello");
webSocket.binaryType = "arraybuffer";
function sendMsg() {	
	// var msgToSend = document.getElementById("messageField").value;
	let msgToSend = document.getElementById("file").files[0];	
	// alert(photo);
	if(webSocket!==null){
		webSocket.send(msgToSend);
		divMsg.innerHTML += "<div style='color:red'>" + msgToSend
				+ "</div>";
		document.getElementById("messageField").value = "";
	}else{
		webSocket = new WebSocket("ws://192.168.0.2:8080/WebsocketSample/hello");
		webSocket.binaryType = "arraybuffer";
		webSocket.send(msgToSend);
		divMsg.innerHTML += "<div style='color:red'>" + msgToSend
				+ "</div>";
		document.getElementById("messageField").value = "";
	}	
}
//public method for encoding an Uint8Array to base64
function encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

webSocket.onmessage = function(message) {	
	var divMsg = document.getElementById("msg-box");
	var elem = document.createElement("img");
	elem.setAttribute("alt", "not available");	
	 var arrayBuffer = message.data;
	    var bytes = new Uint8Array(arrayBuffer);

	    var image = document.getElementById('image');
	    elem.src = 'data:image/png;base64,'+encode(bytes);
	 //elem.src =imageUrl;
	document.getElementById("msg-box").appendChild(elem);
	// divMsg.innerHTML += //" \n"+ message.data+" <br>";
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