package com.jamesbown.retron.service;

import com.jamesbown.retron.dao.CardDAO;
import com.jamesbown.retron.message.DiscussionPhaseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class DiscussionService {

    @Autowired
    private SimpMessagingTemplate template;


    @Autowired
    private CardDAO cardDAO;


    public synchronized void previousOwner() {
        cardDAO.decrementCurrentCardOwnerIndex();
        DiscussionPhaseMessage dpm = new DiscussionPhaseMessage(cardDAO.getCardsByOwner(), cardDAO.getCurrentCardOwnerIndex());
        this.template.convertAndSend("/topic/phase/discussion", dpm);
    }

    public synchronized void nextOwner() {
        cardDAO.incrementCurrentCardOwnerIndex();
        DiscussionPhaseMessage dpm = new DiscussionPhaseMessage(cardDAO.getCardsByOwner(), cardDAO.getCurrentCardOwnerIndex());
        this.template.convertAndSend("/topic/phase/discussion", dpm);
    }
}
