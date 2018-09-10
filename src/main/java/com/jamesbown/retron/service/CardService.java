package com.jamesbown.retron.service;

import com.jamesbown.retron.dao.CardDAO;
import com.jamesbown.retron.domain.Card;
import com.jamesbown.retron.domain.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


@Service
public class CardService {

    @Autowired
    private CardDAO cardDAO;

    public void createCard(Card card) {
        cardDAO.createCard(card);
    }


}
