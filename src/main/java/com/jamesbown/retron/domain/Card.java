package com.jamesbown.retron.domain;

import com.fasterxml.jackson.annotation.JacksonInject;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.jamesbown.retron.CardType;

import java.util.UUID;

public class Card {

    private UUID uuid;
    private CardType cardType;
    private String text;
    private String owner;


    @JsonCreator
    public Card(@JsonProperty("uuid") UUID uuid,
                @JsonProperty("cardType") CardType cardType,
                @JsonProperty("text") String text,
                @JsonProperty("owner") String owner) {
        this.uuid = uuid;
        this.cardType = cardType;
        this.text = text;
        this.owner = owner;
    }

    public UUID getUuid() {
        return uuid;
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
