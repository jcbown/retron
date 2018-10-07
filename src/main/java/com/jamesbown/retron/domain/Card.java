package com.jamesbown.retron.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class Card {

    private UUID uuid;
    private String cardType;
    private String text;
    private User user;


    @JsonCreator
    public Card(@JsonProperty("uuid") UUID uuid,
                @JsonProperty("cardType") String cardType,
                @JsonProperty("text") String text,
                @JsonProperty("user") User user) {
        this.uuid = uuid;
        this.cardType = cardType;
        this.text = text;
        this.user = user;
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getText() {
        return text;
    }

    public User getUser() {
        return user;
    }

    public String getCardType() {
        return cardType;
    }

    @Override
    public String toString() {
        return "Card{" +
                "cardType='" + cardType + '\'' +
                ", user=" + user +
                ", text='" + text + '\'' +
                '}';
    }
}
