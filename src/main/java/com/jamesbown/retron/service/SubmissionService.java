package com.jamesbown.retron.service;

import com.jamesbown.retron.config.WebSocketPrincipalHolder;
import com.jamesbown.retron.dao.UserDAO;
import com.jamesbown.retron.domain.Notification;
import com.jamesbown.retron.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class SubmissionService {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private WebSocketPrincipalHolder principalHolder;

    @Autowired
    private UserService userService;

    @Autowired
    private PhaseService phaseService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserDAO userDAO;

    public void userReady() {
        String username = principalHolder.getPrincipal().getName();
        User user = userDAO.getUser(username).get();
        user.setReady(true);
        this.userService.sendUsers();
        if (this.userDAO.areAllReady()) {
            this.phaseService.advancePhase();
        } else {
            this.notificationService.notifyClient(new Notification(user.getFullName() + " is ready"));
        }
    }

}
