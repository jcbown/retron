package com.jamesbown.retron.service;

import com.jamesbown.retron.config.WebSocketPrincipalHolder;
import com.jamesbown.retron.dao.CardDAO;
import com.jamesbown.retron.domain.Card;
import com.jamesbown.retron.domain.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;


@Service
public class CardService {

    @Autowired
    private WebSocketPrincipalHolder principalHolder;

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private CardDAO cardDAO;

    public void createCard(Card card) {
        String username = principalHolder.getPrincipal().getName();
        Card cardWithOwner = new Card(card.getUuid(), card.getCardType(), card.getText(), username);
        cardDAO.createCard(cardWithOwner);
        this.template.convertAndSendToUser(username,"/topic/card/create", cardWithOwner);
    }


    public void updateCard(Card card) {
        cardDAO.updateCard(card);
    }

    public void deleteCard(Card card) {
        String username = principalHolder.getPrincipal().getName();
        cardDAO.deleteCard(card.getUuid());
        this.template.convertAndSendToUser(username, "/topic/card/delete", card);
    }
}
