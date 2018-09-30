package com.jamesbown.retron.service;

import com.jamesbown.retron.config.WebSocketPrincipalHolder;
import com.jamesbown.retron.dao.CardDAO;
import com.jamesbown.retron.dao.ThemeDAO;
import com.jamesbown.retron.dao.UserDAO;
import com.jamesbown.retron.domain.Notification;
import com.jamesbown.retron.domain.User;
import com.jamesbown.retron.domain.Vote;
import com.jamesbown.retron.message.DiscussionPhaseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VotingService {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private PhaseService phaseService;

    @Autowired
    private UserService userService;

    @Autowired
    private WebSocketPrincipalHolder principalHolder;

    @Autowired
    private ThemeDAO themeDAO;

    @Autowired
    private UserDAO userDAO;


    public synchronized void castVotes(List<String> themeIds) {
        String username = principalHolder.getPrincipal().getName();
        User user = userDAO.getUser(username).get();

        themeIds.forEach(id -> {
            Vote vote = new Vote(user);
            themeDAO.addVoteToTheme(id, vote);
        });

        user.setReady(true);
        this.userService.sendUsers();

        // check if all votes are cast
        if (userDAO.areAllReady()) {
            this.phaseService.advancePhase();
        } else {
            this.notificationService.notifyClient(new Notification(user.getFullName() + " finished voting"));
        }
    }
}
