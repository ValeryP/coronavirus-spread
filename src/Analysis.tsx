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
import {useCookies} from "react-cookie";
import {TabPanel, tabsUseStyles} from "./App";

function Analysis() {
    const classes = tabsUseStyles();

    const [cookies, setCookie] = useCookies(['saved-prefs']);
    const [value, setValue] = React.useState(Number(cookies['tab-analysis']) || 0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    function handleTabClick(name: string, index: number) {
        ReactGA.event({
            category: 'Click',
            action: 'Tab',
            label: name
        });
        setCookie('tab-analysis', index, {path: '/'});
    }

    function buildTabTitle(name: string, index: number, selected: number) {
        return <Tab onClick={() => handleTabClick(name, index)} label={name}
                    className={index === selected ? classes.tabSelected : classes.tabDefault}
                    {...{
                        id: `simple-tab-${index}`,
                        'aria-controls': `simple-tabpanel-${index}`,
                    }} />
    }

    const tabs = ['Daily new deaths', 'Deaths per million', 'Tests by country', 'Daily new confirmed', 'Speed of growth', 'Symptoms and fatality']

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
            <SymptomsAndFatality/>
        </TabPanel>
    </>
}

export default Analysis;
