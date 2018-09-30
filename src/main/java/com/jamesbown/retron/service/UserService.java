package com.jamesbown.retron.service;

import com.jamesbown.retron.Phase;
import com.jamesbown.retron.dao.CardDAO;
import com.jamesbown.retron.dao.PhaseDAO;
import com.jamesbown.retron.dao.ThemeDAO;
import com.jamesbown.retron.dao.UserDAO;
import com.jamesbown.retron.domain.Notification;
import com.jamesbown.retron.domain.Theme;
import com.jamesbown.retron.domain.User;
import com.jamesbown.retron.message.ActionsPhaseMessage;
import com.jamesbown.retron.message.DiscussionPhaseMessage;
import com.jamesbown.retron.message.GroupingPhaseMessage;
import com.jamesbown.retron.message.VotingPhaseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class UserService {


    @Autowired
    private SimpMessagingTemplate template;


    @Autowired
    private UserDAO userDAO;

    @Autowired
    private PhaseService phaseService;

    @Autowired
    private NotificationService notificationService;


    public void userJoin(User user) {
        if (!userDAO.hasUser(user)) {
            userDAO.createUser(user);
            notificationService.notifyClient(new Notification(user.getFullName() + " has joined the game!"));
        }
        this.sendUsers();
        phaseService.sendCurrentPhaseToUser();
    }

    public void sendUsers() {
        this.template.convertAndSend("/topic/user/update", userDAO.getUsers());
    }
}
