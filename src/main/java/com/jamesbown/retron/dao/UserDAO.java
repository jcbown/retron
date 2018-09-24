package com.jamesbown.retron.dao;

import com.jamesbown.retron.domain.User;
import org.springframework.stereotype.Repository;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserDAO {

    private List<User> users = new LinkedList<>();

    public synchronized void createUser(User user) {
        this.users.add(user);
    }

    public synchronized boolean hasUser(User user) {
        return this.users.contains(user);
    }

    public synchronized Optional<User> getUser(String id) {
        return users.stream().filter(u -> u.getId().equals(id)).findFirst();
    }

    public synchronized void reset() {
        this.users.clear();
    }

    public synchronized int getUserCount() {
        return this.users.size();
    }
}
