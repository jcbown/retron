package com.jamesbown.retron.domain;

import java.security.Principal;

public class RetronPrincipal implements Principal {

    private final String name;

    public RetronPrincipal(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }
}
