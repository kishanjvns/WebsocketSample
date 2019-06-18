package com.tech.kj.ws;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class HelloWorldTextEncoderDecoder implements Encoder.Text<String>,Decoder.Text<String> {
//encoder
	
	@Override public void init(EndpointConfig config) {
		 System.out.println("MessageEncoder - init method called");
	}
	 

	@Override
	public void destroy() {
		System.out.println("MessageEncoder - destroy method called");		
	}

	@Override
	public String encode(String object) throws EncodeException {
		return object;
	}
//end encoder

	@Override
	public String decode(String s) throws DecodeException {		
		return s;
	}

	@Override
	public boolean willDecode(String s) {		
		return true;
	}
	
}
