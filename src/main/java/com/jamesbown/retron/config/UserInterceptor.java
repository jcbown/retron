package com.jamesbown.retron.config;

import com.jamesbown.retron.domain.RetronPrincipal;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptorAdapter;
import org.springframework.messaging.support.MessageHeaderAccessor;

import java.util.LinkedList;
import java.util.Map;

//https://stackoverflow.com/questions/45357194/simple-convertandsendtouser-where-do-i-get-a-username
public class UserInterceptor extends ChannelInterceptorAdapter {

    private final WebSocketPrincipalHolder webSocketPrincipalHolder;

    public UserInterceptor(WebSocketPrincipalHolder webSocketPrincipalHolder) {
        this.webSocketPrincipalHolder = webSocketPrincipalHolder;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        // set the Principal on the Websocket message
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            Object raw = message
                    .getHeaders()
                    .get(SimpMessageHeaderAccessor.NATIVE_HEADERS);

            if (raw instanceof Map) {
                Object name = ((Map) raw).get("name");

                if (name instanceof LinkedList) {
                    accessor.setUser(new RetronPrincipal(((LinkedList) name).get(0).toString()));
                }
            }
        }
        // re-use that Principal and add it to the holder
        this.webSocketPrincipalHolder.setPrincipal(accessor.getUser());
        return message;
    }
}