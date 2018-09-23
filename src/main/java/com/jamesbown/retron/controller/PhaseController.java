package com.jamesbown.retron.controller;

import com.jamesbown.retron.domain.Notification;
import com.jamesbown.retron.service.DiscussionService;
import com.jamesbown.retron.service.NotificationService;
import com.jamesbown.retron.service.PhaseService;
import com.jamesbown.retron.service.VotingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class PhaseController {

    private final NotificationService notificationService;
    private final PhaseService phaseService;
    private final DiscussionService discussionService;
    private final VotingService votingService;

    @Autowired
    public PhaseController(NotificationService notificationService, PhaseService phaseService, DiscussionService discussionService, VotingService votingService) {
        this.notificationService = notificationService;
        this.phaseService = phaseService;
        this.discussionService = discussionService;
        this.votingService = votingService;
    }

    @MessageMapping("/advance-phase")
    public void advancePhase() throws Exception {
        notificationService.notifyClient(new Notification("Moving to the next phase!"));
        phaseService.advancePhase();
    }

    @MessageMapping("/discussion/previousOwner")
    public void discussionPreviousOwner() {
        discussionService.previousOwner();
    }

    @MessageMapping("/discussion/nextOwner")
    public void discussionNextOwner() {
        discussionService.nextOwner();
    }

    @MessageMapping("/voting/cast")
    public void votingCastVote(List<String> themeIds) {
        votingService.castVotes(themeIds);
    }
}
