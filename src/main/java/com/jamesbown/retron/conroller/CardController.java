package com.jamesbown.retron.conroller;

import com.jamesbown.retron.dao.CardDAO;
import com.jamesbown.retron.domain.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class CardController {

    private final CardDAO cardDAO;

    @Autowired
    public CardController(CardDAO cardDAO) {
        this.cardDAO = cardDAO;
    }

    @MessageMapping("/card/create")
    public void createCard(Card card) throws Exception {
        this.cardDAO.addCard(card);
    }

}
