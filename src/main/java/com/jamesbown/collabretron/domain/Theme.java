package com.jamesbown.collabretron.domain;

import java.util.Set;

public class Theme {

    private Set<Card> cards;

    public Theme(Set<Card> cards) {
        this.cards = cards;
    }

    public Set<Card> getCards() {
        return cards;
    }
}
