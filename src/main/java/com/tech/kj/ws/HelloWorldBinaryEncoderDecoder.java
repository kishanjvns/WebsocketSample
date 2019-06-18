package com.tech.kj.ws;

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
		// TODO Auto-generated method stub
		
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ByteBuffer encode(byte[] object) throws EncodeException {
		// TODO Auto-generated method stub
		return null;
	}
	//end encoder

	@Override
	public byte[] decode(ByteBuffer bytes) throws DecodeException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean willDecode(ByteBuffer bytes) {
		// TODO Auto-generated method stub
		return true;
	}
	

}
