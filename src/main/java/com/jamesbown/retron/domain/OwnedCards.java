package com.jamesbown.retron.domain;

import java.util.List;

public class OwnedCards {

    private String owner;
    private List<Card> cards;

    public OwnedCards(String owner, List<Card> cards) {
        this.owner = owner;
        this.cards = cards;
    }

    public String getOwner() {
        return owner;
    }

    public List<Card> getCards() {
        return cards;
    }
}
