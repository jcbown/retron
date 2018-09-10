package com.jamesbown.retron.message;

import com.jamesbown.retron.domain.Card;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

public class GroupingPhaseMessage {

    private final List<Card> cards;

    public GroupingPhaseMessage(List<Card> cards) {
        this.cards = cards;
    }

    public List<Card> getCards() {
        return cards;
    }
}
