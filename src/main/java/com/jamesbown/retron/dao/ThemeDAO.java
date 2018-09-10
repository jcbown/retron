package com.jamesbown.retron.dao;

import com.jamesbown.retron.domain.Theme;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

@Repository
public class ThemeDAO {

    private final List<Theme> themes = Collections.synchronizedList(new LinkedList<>());

    public void createTheme(Theme theme) {
        themes.add(theme);
    }

    public List<Theme> getThemes() {
        return this.themes;
    }

    public void reset() {
        this.themes.clear();
    }
}
