package com.jamesbown.retron.dao;

import com.jamesbown.retron.domain.OwnedCards;
import com.jamesbown.retron.domain.Theme;
import com.jamesbown.retron.domain.Card;
import com.jamesbown.retron.domain.User;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
public class CardDAO {
//TODO synchronization
    private final Map<UUID, Card> cards = Collections.synchronizedMap(new LinkedHashMap<>());
    private int currentCardOwnerIndex = 0;

    public synchronized void createCard(Card card) {
        this.cards.put(card.getUuid(), card);
    }

    public synchronized void updateCard(Card card) {
        this.cards.put(card.getUuid(), card);
    }

    public synchronized List<Card> getCards() {
        return new ArrayList<>(this.cards.values());
    }

    public synchronized List<Card> getCardsForOwner(User user) {
        return this.cards.values().stream()
                .filter(c -> c.getUser().equals(user))
                .collect(Collectors.toList());
    }

    public synchronized List<OwnedCards> getCardsByOwner() {
        List<Card> cards = this.getCards(); // Get a copy of the cards

        // Shuffle cards (sort by random uuid) and collect distinct owners
        // This will be deterministic for a static set of cards
        List<User> owners = cards.stream()
                .sorted(Comparator.comparing(Card::getUuid))
                .map(Card::getUser)
                .distinct()
                .collect(Collectors.toList());

        // Construct Linked MultiMap
        List<OwnedCards> cardsByOwner = new LinkedList<>();
        owners.forEach(o -> {
            List<Card> cardsForOwner = cards.stream()
                    .filter(c -> c.getUser().equals(o))
                    .collect(Collectors.toList());
            cardsByOwner.add(new OwnedCards(o, cardsForOwner));
        });

        return cardsByOwner;
    }

    public synchronized List<Theme> createThemesFromCards() {
        LinkedList<Theme> themes = new LinkedList<>();
        synchronized (cards) {
            cards.values().forEach(c -> {
                Theme t = new Theme(Arrays.asList(c));
                themes.add(t);
            });
        }
        return themes;
    }

    public synchronized int getCurrentCardOwnerIndex() {
        return currentCardOwnerIndex;
    }

    public synchronized void incrementCurrentCardOwnerIndex() {
        long ownerCount = cards.values().stream().map(Card::getUser).distinct().count();
        if (this.currentCardOwnerIndex + 1 < ownerCount) {
            this.currentCardOwnerIndex++;
        }
    }

    public synchronized void decrementCurrentCardOwnerIndex() {
        if (this.currentCardOwnerIndex > 0) {
            this.currentCardOwnerIndex--;
        }
    }

    public synchronized void reset() {
        cards.clear();
        this.currentCardOwnerIndex = 0;
    }

    public synchronized void deleteCard(UUID uuid) {
        this.cards.remove(uuid);
    }
}
