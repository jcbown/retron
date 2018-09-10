package com.jamesbown.retron.dao;

import com.jamesbown.retron.domain.Theme;
import com.jamesbown.retron.domain.Card;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class CardDAO {

    private final List<Card> cards = Collections.synchronizedList(new LinkedList<Card>());
    private int currentCardIndex = 0;

    public void createCard(Card card) {
        this.cards.add(card);
    }

    public List<Card> getCards() {
        return this.cards;
    }

    public List<Theme> createThemesFromCards() {
        LinkedList<Theme> themes = new LinkedList<>();
        synchronized (cards) {
            cards.forEach(c -> {
                Theme t = new Theme(Arrays.asList(c));
                themes.add(t);
            });
        }
        return themes;
    }

    public int getCurrentCardIndex() {
        return currentCardIndex;
    }

    public void setCurrentCardIndex(int currentCardIndex) {
        this.currentCardIndex = currentCardIndex;
    }

    public void reset() {
        cards.clear();
    }
}
