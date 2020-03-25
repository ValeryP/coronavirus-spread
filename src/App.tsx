import React, {useEffect} from 'react';
import Prediction from "./Prediction";
import {AppBar, Box, IconButton, Tab, Tabs, Typography} from "@material-ui/core";
import _ from "lodash";
import ReactGA from "react-ga";
import Dashboard from "./Dashboard";
import {useCookies} from "react-cookie";
import Analysis from "./Analysis";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import AddTabDialog, {Country} from "./AddTabDialog";
import moment from "moment";
import GenericTab from "./GenericTab";
import {Onboarding} from "./Onboarding";

export interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export function TabPanel(props: TabPanelProps) {
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

export const tabsUseStyles = makeStyles((theme: Theme) =>
    createStyles({
        tabDefault: {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main
        },
        tabSelected: {
            color: theme.palette.secondary.main,
        }
    }),
);

interface UserTab {
    index: number,
    country: string,
    flag: string,
    url: string,
    timestamp: number
}

function App() {
    const classes = tabsUseStyles();

    const [cookies, setCookie] = useCookies(['saved-prefs']);
    const [value, setValue] = React.useState(Number(cookies['tab-main']) || 0);
    const [showAddTabDialog, setShowAddTabDialog] = React.useState(false);
    const [showOnboarding, setShowOnboarding] = React.useState(true);
    const [userTabs, setUserTabsRaw] = React.useState((cookies['user-tabs'] || []) as UserTab[]);
    console.info('raw', userTabs)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleAddButtonClick = () => {
        setShowAddTabDialog(true)
    };

    const handleAddTab = (url: string, country: Country) => {
        const newTab = {
            index: userTabs.length,
            country: country.name,
            flag: country.flag,
            url: url,
            timestamp: moment().unix()
        } as UserTab
        const userTabsObj = _.concat(userTabs, [newTab]);
        setCookie('user-tabs', JSON.stringify(userTabsObj), {path: '/'});
        setUserTabsRaw(userTabsObj)
        handleAddTabClose()
    };

    const handleAddTabClose = () => {
        setShowAddTabDialog(false)
    };

    function handleTabClick(name: string, index: number) {
        ReactGA.event({
            category: 'Click',
            action: 'Tab',
            label: name
        });
        setCookie('tab-main', index, {path: '/'});
    }

    const userTabsTitles = _.map(userTabs, 'flag')
    const tabsDefault = ['Dashboard', 'Analysis', 'Prediction']
    const tabs = [...tabsDefault, ...userTabsTitles]

    function buildTabTitle(name: string, index: number, selected: number) {
        const isUserTab = index > tabsDefault.length - 1;
        const userTabsStyles = isUserTab ? {fontSize: '1.3rem', minWidth: 64} : {};
        return <Tab onClick={() => handleTabClick(name, index)} label={name}
                    className={index === selected ? classes.tabSelected : classes.tabDefault}
                    {...{
                        className: `simple-tab-${index}`, id: `simple-tab-${index}`,
                        'aria-controls': `simple-tabpanel-${index}`,
                    }} style={{...userTabsStyles}} key={index}/>
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <>
        <AppBar position="sticky">
            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                {_.map(tabs, (v, ind) => buildTabTitle(v, ind, value))}
                <IconButton className={`simple-tab-last`} aria-haspopup="true" color="inherit"
                            onClick={handleAddButtonClick}>
                    <AddRoundedIcon/>
                </IconButton>
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} key={0}>
            <Dashboard/>
        </TabPanel>
        <TabPanel value={value} index={1} key={1}>
            <Analysis/>
        </TabPanel>
        <TabPanel value={value} index={2} key={2}>
            <Prediction/>
        </TabPanel>
        {_.map(userTabs, ({url}, i) =>
            <TabPanel value={value} index={tabsDefault.length + i} key={tabsDefault.length + i}>
                <GenericTab url={url}/>
            </TabPanel>)}
        <AddTabDialog isOpen={showAddTabDialog} handleSave={handleAddTab}
                      handleClose={handleAddTabClose}/>
        <Onboarding run={showOnboarding}/>
    </>
}

export default App;
