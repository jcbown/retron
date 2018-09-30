package com.jamesbown.retron.message;

import com.jamesbown.retron.domain.Card;
import com.jamesbown.retron.domain.User;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;
import java.util.Map;

public class SubmissionPhaseMessage {

    private List<Card> cards;

    public SubmissionPhaseMessage(List<Card> cards) {
        this.cards = cards;
    }

    public List<Card> getCards() {
        return cards;
    }

}
