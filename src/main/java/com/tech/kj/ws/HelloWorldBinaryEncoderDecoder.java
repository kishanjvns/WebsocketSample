package com.tech.kj.ws;

import java.nio.Buffer;
import java.nio.ByteBuffer;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class HelloWorldBinaryEncoderDecoder implements Encoder.Binary<byte[]>,Decoder.Binary<byte[]> {
//encoder
	@Override
	public void init(EndpointConfig config) {
		System.out.println("Binary MessageEncoder - init method called");
		
	}

	@Override
	public void destroy() {
		System.out.println("Binary MessageEncoder - destroy method called");	
		
	}

	@Override
	public ByteBuffer encode(byte[] object) throws EncodeException {
		System.out.println("Binary MessageEncoder - encode method called");
		ByteBuffer buffer=ByteBuffer.wrap(object, 0, object.length);		
		return buffer;
	}
	//end encoder

	@Override
	public byte[] decode(ByteBuffer bytes) throws DecodeException {
		System.out.println("Binary MessageEncoder - decode method called");
		return bytes.array();		
	}

	@Override
	public boolean willDecode(ByteBuffer bytes) {
		System.out.println("Binary MessageEncoder - willDecode method called");
		return true;
	}
	

}
