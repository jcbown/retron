package com.jamesbown.retron.dao;

import com.jamesbown.retron.domain.Theme;
import com.jamesbown.retron.domain.Vote;
import com.jamesbown.retron.message.ActionsPhaseMessage;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.Comparator;
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

    public void addVoteToTheme(String id, Vote v) {
        Theme theme = this.themes.stream()
                .filter(t -> t.getId().equals(id))
                .findFirst()
                .get();
        theme.addVote(v);
    }

    public boolean haveNVotesBeenCast(int n) {
        long count = this.themes.stream()
                .map(t -> t.getVotes().size())
                .reduce(0, Integer::sum);
        return count == n;
    }

    public void reset() {
        this.themes.clear();
    }

    public ActionsPhaseMessage decideOnActionThemes() {
        List<Theme> actionThemes = new LinkedList<>();
        List<Theme> otherThemes = new LinkedList<>();

        // sort in descending order according to votes
        this.themes.sort(Comparator.comparingInt(c -> c.getVotes().size()));
        Collections.reverse(this.themes);

        int lastCountAddedToActions = Integer.MAX_VALUE;
        for (Theme theme : this.themes) {
            if (actionThemes.size() < 3) {
                actionThemes.add(theme);
                lastCountAddedToActions = theme.getVotes().size();
            } else if (theme.getVotes().size() == lastCountAddedToActions) {
                actionThemes.add(theme); // if one theme with count n is actioned, they should all be actioned
            } else {
                otherThemes.add(theme);
            }
        }
        return new ActionsPhaseMessage(actionThemes, otherThemes);
    }
}
