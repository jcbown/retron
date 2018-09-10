package com.jamesbown.retron.message;

import com.jamesbown.retron.domain.Theme;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

public class VotingPhaseMessage {

    private List<Theme> themes;

    public VotingPhaseMessage(List<Theme> themes) {
        this.themes = themes;
    }

    public List<Theme> getThemes() {
        return themes;
    }
}
