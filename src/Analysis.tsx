import React from 'react';
import {AppBar, Tab, Tabs} from "@material-ui/core";
import _ from "lodash";
import DailyNewDeaths from "./DailyNewDeaths";
import DeathsPerMillion from "./DeathsPerMillion";
import TestsPerCountry from "./TestsPerCountry";
import ConfirmedPerCountry from "./ConfirmedPerCountry";
import SpeedOfGrowth from "./SpeedOfGrowth";
import SymptomsAndFatality from "./SymptomsAndFatality";
import ReactGA from "react-ga";
import {TabPanel, tabsUseStyles} from "./App";
import EpidemicCalculator from "./EpidemicCalculator";
import {getStorageState, saveStorageState} from "./Storage";

function Analysis() {
    const classes = tabsUseStyles();

    const storage = getStorageState()

    const [value, setValue] = React.useState(storage.tabAnalysis);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    function handleTabClick(name: string, index: number) {
        ReactGA.event({
            category: 'Click',
            action: 'Tab',
            label: name
        });
        saveStorageState({...storage, tabAnalysis: index})
    }

    function buildTabTitle(name: string, index: number, selected: number) {
        return <Tab onClick={() => handleTabClick(name, index)} label={name}
                    className={index === selected ? classes.tabSelected : classes.tabDefault}
                    {...{
                        id: `simple-tab-${index}`,
                        'aria-controls': `simple-tabpanel-${index}`,
                    }} />
    }

    const tabs = ['Daily new deaths', 'Deaths per million', 'Tests by country',
        'Daily new confirmed', 'Speed of growth', 'Epidemic Calculator', 'Symptoms and fatality']

    return <>
        <AppBar position="sticky">
            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                {_.map(tabs, (v, ind) => buildTabTitle(v, ind, value))}
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <DailyNewDeaths/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <DeathsPerMillion/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <TestsPerCountry/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <ConfirmedPerCountry/>
        </TabPanel>
        <TabPanel value={value} index={4}>
            <SpeedOfGrowth/>
        </TabPanel>
        <TabPanel value={value} index={5}>
            <EpidemicCalculator/>
        </TabPanel>
        <TabPanel value={value} index={6}>
            <SymptomsAndFatality/>
        </TabPanel>
    </>
}

export default Analysis;
