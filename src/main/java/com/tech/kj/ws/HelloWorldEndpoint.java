package com.tech.kj.ws;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value="/hello")
public class HelloWorldEndpoint {
	private static Set<Session> allSessions=new HashSet<>();

	public HelloWorldEndpoint() {
		System.out.println("<<<< class loaded "+this.getClass());
	}
	@OnOpen
	public void onOpen(Session session) {
		System.out.printf("<<<<< Session opened, id: %s%n", session.getId());
		allSessions.add(session);
	      try {	    	  
	    		  session.getBasicRemote().sendText("Welcome to Websocket world");	    	  	         
	      } catch (IOException ex) {
	    	  System.err.println("<<<<<<< error \n"+ex.getStackTrace());
	      }
	}
	/*
	 * @OnMessage public void onMessage(ByteBuffer message,Session session) {
	 * System.out.printf("<<<<< Message received. Session id: %s Message: %s%n",
	 * session.getId(), message); try { for(Session
	 * session2:session.getOpenSessions()) {
	 * session2.getBasicRemote().sendBinary(message); } } catch (IOException e) {
	 * System.err.println("<<<<<<< error \n"+e.getStackTrace()); } }
	 */
	
	
	@OnMessage
	public void onMessage(String message, Session session) {
		System.out.printf("<<<<< Message received. Session id: %s Message: %s%n", session.getId(), message);
		try {
			for (Session session2 : session.getOpenSessions()) {
				session2.getBasicRemote().sendText(message);
			}
		} catch (IOException e) {
			System.err.println("<<<<<<< error \n" + e.getStackTrace());
		}
	}
	 
	
	@OnError
	public void onError(Throwable t) {
		System.err.println(">>>> error \n"+t.getStackTrace());
	}
	
	@OnClose
	public void onClose(Session session) {
		System.out.printf("Session closed with id: %s%n", session.getId());
		allSessions.remove(session);
	}
	
	
	
	
}
