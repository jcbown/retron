package com.jamesbown.retron.message;

import com.jamesbown.retron.domain.Theme;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

public class ActionsPhaseMessage {

    private final List<Theme> themes;

    public ActionsPhaseMessage(List<Theme> themes) {
        this.themes = themes;
    }

    public List<Theme> getThemes() {
        return themes;
    }
}
