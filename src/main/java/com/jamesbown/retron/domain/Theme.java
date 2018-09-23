package com.jamesbown.retron.domain;

import com.jamesbown.retron.domain.Card;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

public class Theme {


    private String id;
    private List<Card> cards;
    private List<Vote> votes;

    public Theme(List<Card> cards)
    {
        this.id = UUID.randomUUID().toString();
        this.cards = cards;
        this.votes = new LinkedList<>();
    }

    public void addVote(Vote v) {
        this.votes.add(v);
    }

    public String getId() {
        return id;
    }

    public List<Card> getCards() {
        return cards;
    }

    public List<Vote> getVotes() {
        return votes;
    }
}
