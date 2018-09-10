package com.jamesbown.retron.controller;

import com.jamesbown.retron.dao.CardDAO;
import com.jamesbown.retron.dao.PhaseDAO;
import com.jamesbown.retron.dao.ThemeDAO;
import com.jamesbown.retron.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ResetController {

    @Autowired
    private CardDAO cardDAO;

    @Autowired
    private PhaseDAO phaseDAO;

    @Autowired
    private ThemeDAO themeDAO;

    @Autowired
    private UserDAO userDAO;

    @MessageMapping("/reset")
    public void reset() {
        cardDAO.reset();
        phaseDAO.reset();
        themeDAO.reset();
        userDAO.reset();
    }
}
