package com.jamesbown.retron.dao;

import com.jamesbown.retron.domain.Card;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

@Repository
public class CardDAO {

    List<Card> cards = Collections.synchronizedList(new LinkedList<Card>());

    public void addCard(Card card) {
        this.cards.add(card);
    }

    public List<Card> getCards() {
        return this.cards;
    }

}
