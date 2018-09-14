package com.jamesbown.retron.message;

import com.jamesbown.retron.domain.Card;
import com.jamesbown.retron.domain.OwnedCards;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;
import java.util.Map;

public class DiscussionPhaseMessage {


    private List<OwnedCards> cardsByOwner;
    private int currentOwner;

    public DiscussionPhaseMessage(List<OwnedCards> cardsByOwner, int currentOwner) {
        this.cardsByOwner = cardsByOwner;
        this.currentOwner = currentOwner;
    }

    public List<OwnedCards> getCardsByOwner() {
        return cardsByOwner;
    }

    public int getCurrentOwner() {
        return currentOwner;
    }
}
