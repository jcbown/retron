package com.jamesbown.retron.message;

import com.jamesbown.retron.domain.Card;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

public class DiscussionPhaseMessage {


    private List<Card> cards;

    private int currentCardIndex;

    public DiscussionPhaseMessage(List<Card> cards, int currentCardIndex) {
        this.cards = cards;
        this.currentCardIndex = currentCardIndex;
    }

    public List<Card> getCards() {
        return cards;
    }

    public int getCurrentCardIndex() {
        return currentCardIndex;
    }
}
