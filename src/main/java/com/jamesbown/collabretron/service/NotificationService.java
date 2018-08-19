package com.jamesbown.collabretron.service;

import com.jamesbown.collabretron.domain.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


@Service
public class NotificationService {

    private final SimpMessagingTemplate template;

    @Autowired
    public NotificationService(SimpMessagingTemplate template) {
        this.template = template;
    }

    public void notifyClient(Notification notification) {
        this.template.convertAndSend("/topic/notification", notification);
    }


}
