package com.jamesbown.retron.service;

import com.jamesbown.retron.*;
import com.jamesbown.retron.config.WebSocketPrincipalHolder;
import com.jamesbown.retron.dao.*;
import com.jamesbown.retron.domain.Card;
import com.jamesbown.retron.domain.OwnedCards;
import com.jamesbown.retron.domain.Theme;
import com.jamesbown.retron.domain.User;
import com.jamesbown.retron.message.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PhaseService {


    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private WebSocketPrincipalHolder principalHolder;

    @Autowired
    private CardDAO cardDAO;

    @Autowired
    private ThemeDAO themeDAO;

    @Autowired
    private PhaseDAO phaseDAO;

    @Autowired
    private UserService userService;

    @Autowired
    private UserDAO userDAO;

    public void advancePhase() {
        switch (phaseDAO.getCurrentPhase()) {
            case SUBMISSION:
                phaseDAO.setCurrentPhase(Phase.DISCUSSION);
                userDAO.markAllNotReady();
                userService.sendUsers();
                List<OwnedCards> cardsByOwner = cardDAO.getCardsByOwner();
                DiscussionPhaseMessage dpm = new DiscussionPhaseMessage(cardsByOwner, cardDAO.getCurrentCardOwnerIndex());
                this.template.convertAndSend("/topic/phase/discussion", dpm);
                break;
            case DISCUSSION:
                phaseDAO.setCurrentPhase(Phase.GROUPING);
                userDAO.markAllNotReady();
                userService.sendUsers();
                GroupingPhaseMessage gpm = new GroupingPhaseMessage(cardDAO.getCards());
                this.template.convertAndSend("/topic/phase/grouping", gpm);
                break;
            case GROUPING:
                phaseDAO.setCurrentPhase(Phase.VOTING);
                userDAO.markAllNotReady();
                userService.sendUsers();
                List<Theme> themes = cardDAO.createThemesFromCards();
                themes.forEach(t -> themeDAO.createTheme(t));
                VotingPhaseMessage vpm = new VotingPhaseMessage(themeDAO.getThemes());
                this.template.convertAndSend("/topic/phase/voting", vpm);
                break;
            case VOTING:
                phaseDAO.setCurrentPhase(Phase.ACTIONS);
                userDAO.markAllNotReady();
                userService.sendUsers();
                ActionsPhaseMessage apm = themeDAO.decideOnActionThemes();
                this.template.convertAndSend("/topic/phase/actions", apm);
                break;
            case ACTIONS:
            default:
                break; // do nothing
        }
    }

    public void sendCurrentPhaseToUser() {
        String username = principalHolder.getPrincipal().getName();
        User user = userDAO.getUser(username).get();
        switch (phaseDAO.getCurrentPhase()) {
            case SUBMISSION:
                SubmissionPhaseMessage spm = new SubmissionPhaseMessage(cardDAO.getCardsForOwner(user));
                this.template.convertAndSendToUser(username, "/topic/phase/submission", spm);
                break;
            case DISCUSSION:
                DiscussionPhaseMessage dpm = new DiscussionPhaseMessage(cardDAO.getCardsByOwner(), cardDAO.getCurrentCardOwnerIndex());
                this.template.convertAndSendToUser(username, "/topic/phase/discussion", dpm);
                break;
            case GROUPING:
                GroupingPhaseMessage gpm = new GroupingPhaseMessage(cardDAO.getCards());
                this.template.convertAndSendToUser(username, "/topic/phase/grouping", gpm);
                break;
            case VOTING:
                VotingPhaseMessage vpm = new VotingPhaseMessage(themeDAO.getThemes());
                this.template.convertAndSendToUser(username, "/topic/phase/voting", vpm);
                break;
            case ACTIONS:
                ActionsPhaseMessage apm = themeDAO.decideOnActionThemes();
                this.template.convertAndSendToUser(username, "/topic/phase/actions", apm);
                break;
        }
    }

}
