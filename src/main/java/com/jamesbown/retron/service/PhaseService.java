package com.jamesbown.retron.service;

import com.jamesbown.retron.*;
import com.jamesbown.retron.dao.CardDAO;
import com.jamesbown.retron.dao.PhaseDAO;
import com.jamesbown.retron.dao.ThemeDAO;
import com.jamesbown.retron.domain.Theme;
import com.jamesbown.retron.domain.User;
import com.jamesbown.retron.message.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class PhaseService {


    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private CardDAO cardDAO;

    @Autowired
    private ThemeDAO themeDAO;

    @Autowired
    private PhaseDAO phaseDAO;


    public void advancePhase() {
        switch (phaseDAO.getCurrentPhase()) {
            case SUBMISSION:
                phaseDAO.setCurrentPhase(Phase.DISCUSSION);
                DiscussionPhaseMessage dpm = new DiscussionPhaseMessage(cardDAO.getCards(), cardDAO.getCurrentCardIndex());
                this.template.convertAndSend("/topic/phase/discussion", dpm);
                break;
            case DISCUSSION:
                phaseDAO.setCurrentPhase(Phase.GROUPING);
                GroupingPhaseMessage gpm = new GroupingPhaseMessage(cardDAO.getCards());
                this.template.convertAndSend("/topic/phase/grouping", gpm);
                break;
            case GROUPING:
                phaseDAO.setCurrentPhase(Phase.VOTING);
                List<Theme> themes = cardDAO.createThemesFromCards();
                themes.forEach(t -> themeDAO.createTheme(t));
                VotingPhaseMessage vpm = new VotingPhaseMessage(themeDAO.getThemes());
                this.template.convertAndSend("/topic/phase/voting", vpm);
                break;
            case VOTING:
                phaseDAO.setCurrentPhase(Phase.ACTIONS);
                ActionsPhaseMessage apm = new ActionsPhaseMessage(themeDAO.getThemes());
                this.template.convertAndSend("/topic/phase/actions", apm);
                break;
            case ACTIONS:
            default:
                throw new IllegalStateException("Should not be possible to reach this point");
        }
    }

    public void sendCurrentPhaseToUser(User user) {
        switch (phaseDAO.getCurrentPhase()) {
            case SUBMISSION:
                SubmissionPhaseMessage spm = new SubmissionPhaseMessage(cardDAO.getCards());
                this.template.convertAndSendToUser(user.getId(), "/topic/phase/submission", spm);
                break;
            case DISCUSSION:
                DiscussionPhaseMessage dpm = new DiscussionPhaseMessage(cardDAO.getCards(), cardDAO.getCurrentCardIndex());
                this.template.convertAndSendToUser(user.getId(), "/topic/phase/discussion", dpm);
                break;
            case GROUPING:
                GroupingPhaseMessage gpm = new GroupingPhaseMessage(cardDAO.getCards());
                this.template.convertAndSendToUser(user.getId(), "/topic/phase/grouping", gpm);
                break;
            case VOTING:
                VotingPhaseMessage vpm = new VotingPhaseMessage(themeDAO.getThemes());
                this.template.convertAndSendToUser(user.getId(), "/topic/phase/voting", vpm);
                break;
            case ACTIONS:
                ActionsPhaseMessage apm = new ActionsPhaseMessage(themeDAO.getThemes());
                this.template.convertAndSendToUser(user.getId(), "/topic/phase/actions", apm);
                break;
        }
    }
}
