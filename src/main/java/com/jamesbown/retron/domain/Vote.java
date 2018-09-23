package com.jamesbown.retron.domain;

public class Vote {

    private User user;

    public Vote(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
