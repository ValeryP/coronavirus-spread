import React from 'react';
import Prediction from "./Prediction";
import {AppBar, Box, Tab, Tabs, Typography} from "@material-ui/core";
import _ from "lodash";
import DailyNewDeaths from "./DailyNewDeaths";
import DeathsPerMillion from "./DeathsPerMillion";
import TestsPerCountry from "./TestsPerCountry";
import ConfirmedPerCountry from "./ConfirmedPerCountry";
import SpeedOfGrowth from "./SpeedOfGrowth";
import SymptomsAndFatality from "./SymptomsAndFatality";
import ReactGA from "react-ga";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={0}>{children}</Box>}
        </Typography>
    );
}

function App() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    function handleTabClick(name: string) {
        ReactGA.event({
            category: 'Click',
            action: 'Tab',
            label: name
        });
    }

    function buildTabTitle(name: string, index: number) {
        return <Tab onClick={() => handleTabClick(name)} label={name} {...{
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }} />
    }

    const tabs = ['Prediction', 'Daily new deaths', 'Deaths per million', 'Tests by country',
        'Confirmed by country', 'Speed of growth', 'Symptoms and fatality']

    return <>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                {_.map(tabs, (v, ind) => buildTabTitle(v, ind))}
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <Prediction/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <DailyNewDeaths/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <DeathsPerMillion/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <TestsPerCountry/>
        </TabPanel>
        <TabPanel value={value} index={4}>
            <ConfirmedPerCountry/>
        </TabPanel>
        <TabPanel value={value} index={5}>
            <SpeedOfGrowth/>
        </TabPanel>
        <TabPanel value={value} index={6}>
            <SymptomsAndFatality/>
        </TabPanel>
    </>
}

export default App;
