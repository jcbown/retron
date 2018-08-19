package com.jamesbown.collabretron.domain;

import com.jamesbown.collabretron.CardType;

public class Card {

    private CardType cardType;
    private String text;
    private String owner;

    public Card(CardType cardType, String text, String owner) {
        this.cardType = cardType;
        this.text = text;
        this.owner = owner;
    }

    public String getText() {
        return text;
    }

    public String getOwner() {
        return owner;
    }

    public CardType getCardType() {
        return cardType;
    }
}
