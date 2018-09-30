package com.jamesbown.retron.domain;

import java.util.List;

public class OwnedCards {

    private User owner;
    private List<Card> cards;

    public OwnedCards(User owner, List<Card> cards) {
        this.owner = owner;
        this.cards = cards;
    }

    public User getOwner() {
        return owner;
    }

    public List<Card> getCards() {
        return cards;
    }
}
