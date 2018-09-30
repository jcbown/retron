package com.jamesbown.retron.dao;

import com.jamesbown.retron.Phase;
import com.jamesbown.retron.domain.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Repository
public class SubmissionPhaseDAO {

    private List<User> readyUsers = new LinkedList<>();

    public synchronized void markReady(User user) {
        this.readyUsers.add(user);
    }

    public synchronized List<User> getReadyUsers() {
        return new ArrayList<>(this.readyUsers);
    }

    public synchronized void reset() {
        this.readyUsers.clear();
    }
}
