package com.jamesbown.retron.dao;

import com.jamesbown.retron.Phase;
import org.springframework.stereotype.Repository;

@Repository
public class PhaseDAO {

    private Phase currentPhase = Phase.SUBMISSION;

    public synchronized Phase getCurrentPhase() {
        return currentPhase;
    }

    public synchronized void setCurrentPhase(Phase currentPhase) {
        this.currentPhase = currentPhase;
    }

    public void reset() {
        this.setCurrentPhase(Phase.SUBMISSION);
    }
}
