package com.jamesbown.retron.dao;

import com.jamesbown.retron.domain.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class UserDAO {

    private List<User> users = new LinkedList<>();

    public synchronized void createUser(User user) {
        this.users.add(user);
    }

    public synchronized boolean hasUser(User user) {
        return this.users.contains(user);
    }

    public synchronized List<User> getUsers() {
        return new ArrayList<>(this.users);
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


    public synchronized boolean areAllReady() {
        return this.users.stream()
                .map(User::isReady)
                .reduce(Boolean::logicalAnd)
                .get();
    }

    public synchronized void markAllNotReady() {
        this.users.forEach(u -> u.setReady(false));
    }
}
