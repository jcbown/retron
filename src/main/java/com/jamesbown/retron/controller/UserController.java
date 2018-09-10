package com.jamesbown.retron.controller;

import com.jamesbown.retron.domain.Notification;
import com.jamesbown.retron.domain.User;
import com.jamesbown.retron.service.NotificationService;
import com.jamesbown.retron.service.PhaseService;
import com.jamesbown.retron.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @MessageMapping("/user/join")
    public void userJoin(User user) throws Exception {
        userService.userJoin(user);
    }
}
