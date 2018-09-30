package com.jamesbown.retron.service;

import com.jamesbown.retron.config.WebSocketPrincipalHolder;
import com.jamesbown.retron.dao.SubmissionPhaseDAO;
import com.jamesbown.retron.dao.UserDAO;
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
    private SubmissionPhaseDAO submissionPhaseDAO;

    @Autowired
    private UserDAO userDAO;

    public void userReady() {
        String username = principalHolder.getPrincipal().getName();
        User user = userDAO.getUser(username).get();
        this.submissionPhaseDAO.markReady(user);
        template.convertAndSend("/topic/submission/readyUsers", user);
    }

}
