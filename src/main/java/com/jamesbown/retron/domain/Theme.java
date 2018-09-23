package com.jamesbown.retron.domain;

import com.jamesbown.retron.domain.Card;

import java.util.List;

public class Theme {

    private List<Card> cards;
    private List<Vote> votes;

    public Theme(List<Card> cards) {
        this.cards = cards;
    }

    public List<Card> getCards() {
        return cards;
    }

    public List<Vote> getVotes() {
        return votes;
    }
}
