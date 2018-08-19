package com.jamesbown.collabretron.conroller;

import com.jamesbown.collabretron.AdvancePhaseMessage;
import com.jamesbown.collabretron.dao.CardDAO;
import com.jamesbown.collabretron.domain.Card;
import com.jamesbown.collabretron.domain.Notification;
import com.jamesbown.collabretron.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class AdvancePhaseController {

    private final CardDAO cardDAO;
    private final NotificationService notificationService;

    @Autowired
    public AdvancePhaseController(CardDAO cardDAO, NotificationService notificationService) {
        this.cardDAO = cardDAO;
        this.notificationService = notificationService;
    }

    @MessageMapping("/advance-phase")
    @SendTo("/topic/card/create")
    public List<Card> advancePhase() throws Exception {
        notificationService.notifyClient(new Notification("James has joined the game"));
        return this.cardDAO.getCards();
    }
}
