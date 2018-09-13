package com.jamesbown.retron.config;

import com.jamesbown.retron.domain.RetronPrincipal;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.security.Principal;

/**
 * This bean is scoped to the websocket session and is used to find out who the currently
 * authenticated user is from any service
 */
@Component
@Scope(value="websocket", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class WebSocketPrincipalHolder {

    Principal principal = null;

    public Principal getPrincipal() {
        return principal;
    }

    void setPrincipal(Principal principal) {
        this.principal = principal;
    }

    @PostConstruct
    public void init() {
        // Invoked after dependencies injected
    }

    @PreDestroy
    public void destroy() {
        // Invoked when the WebSocket session ends
    }
}