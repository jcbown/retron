package com.jamesbown.retron.domain;

import com.jamesbown.retron.domain.Card;

import java.util.List;

public class Theme {

    private List<Card> cards;

    public Theme(List<Card> cards) {
        this.cards = cards;
    }

    public List<Card> getCards() {
        return cards;
    }
}
