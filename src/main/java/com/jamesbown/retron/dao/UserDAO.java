package com.jamesbown.retron.dao;

import com.jamesbown.retron.domain.User;
import org.springframework.stereotype.Repository;

import java.util.LinkedList;
import java.util.List;

@Repository
public class UserDAO {

    private List<User> users = new LinkedList<>();

    public void createUser(User user) {
        this.users.add(user);
    }

    public boolean hasUser(User user) {
        return this.users.contains(user);
    }

    public void reset() {
        this.users.clear();
    }
}
