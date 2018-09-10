package com.jamesbown.retron.controller;

import com.jamesbown.retron.domain.Notification;
import com.jamesbown.retron.service.NotificationService;
import com.jamesbown.retron.service.PhaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class PhaseController {

    private final NotificationService notificationService;
    private final PhaseService phaseService;

    @Autowired
    public PhaseController(NotificationService notificationService, PhaseService phaseService) {
        this.notificationService = notificationService;
        this.phaseService = phaseService;
    }

    @MessageMapping("/advance-phase")
    public void advancePhase() throws Exception {
        notificationService.notifyClient(new Notification("Moving to the next phase!"));
        phaseService.advancePhase();
    }
}
