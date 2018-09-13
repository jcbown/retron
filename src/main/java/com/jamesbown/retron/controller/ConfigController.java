package com.jamesbown.retron.controller;

import com.jamesbown.retron.dao.CardDAO;
import com.jamesbown.retron.domain.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ConfigController {


    @MessageMapping("/config")
    public void getConfig() throws Exception {
        // TODO implement - need to return columns
    }

}
