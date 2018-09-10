package com.jamesbown.retron.message;

import com.jamesbown.retron.domain.Card;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

public class SubmissionPhaseMessage {

    private List<Card> cards;

    public SubmissionPhaseMessage(List<Card> cards) {
        this.cards = cards;
    }

    public List<Card> getCards() {
        return cards;
    }
}
