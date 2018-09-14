package com.jamesbown.retron.controller;

import com.jamesbown.retron.dao.CardDAO;
import com.jamesbown.retron.domain.Card;
import com.jamesbown.retron.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class CardController {

    @Autowired
    private CardService cardService;

    @MessageMapping("/card/create")
    public void createCard(Card card) {
        this.cardService.createCard(card);
    }

    @MessageMapping("/card/update")
    public void updateCard(Card card) {
        this.cardService.updateCard(card);
    }

}
