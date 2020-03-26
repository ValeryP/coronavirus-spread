import React from 'react';

function EpidemicCalculator() {
    return <>
        <iframe title={"EpidemicCalculator"}
                src="https://gabgoh.github.io/COVID/index.html?CFR=0.051&D_hospital_lag=5&D_incbation=5.2&D_infectious=2.9&D_recovery_mild=11.1&D_recovery_severe=28.6&I0=6&InterventionAmt=0.47&InterventionTime=20.137399999999992&P_SEVERE=0.1446&R0=2.49&Time_to_death=21.25&logN=17.51"
                style={{width: '100%', height: '100vh', border: 0}}/>
    </>
}

export default EpidemicCalculator;
