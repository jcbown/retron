package com.jamesbown.retron.message;

import com.jamesbown.retron.domain.Theme;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

public class ActionsPhaseMessage {

    private final List<Theme> actionThemes;
    private final List<Theme> otherThemes;

    public ActionsPhaseMessage(List<Theme> actionThemes, List<Theme> otherThemes) {
        this.actionThemes = actionThemes;
        this.otherThemes = otherThemes;
    }

    public List<Theme> getActionThemes() {
        return actionThemes;
    }

    public List<Theme> getOtherThemes() {
        return otherThemes;
    }
}
