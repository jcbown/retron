package com.jamesbown.retron.message;

import com.jamesbown.retron.domain.Card;
import com.jamesbown.retron.domain.User;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;
import java.util.Map;

public class SubmissionPhaseMessage {

    private List<Card> cards;
    private Map<User, Boolean> readyUsers;

    public SubmissionPhaseMessage(List<Card> cards, Map<User, Boolean> readyUsers) {
        this.cards = cards;
        this.readyUsers = readyUsers;
    }

    public List<Card> getCards() {
        return cards;
    }

    public Map<User, Boolean> getReadyUsers() {
        return readyUsers;
    }
}
