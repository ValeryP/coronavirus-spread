import React, {useEffect} from 'react';
import Prediction from "./Prediction";
import {AppBar, Box, IconButton, Snackbar, Tab, Tabs, Typography} from "@material-ui/core";
import _ from "lodash";
import ReactGA from "react-ga";
import Dashboard from "./Dashboard";
import Analysis from "./Analysis";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import AddTabDialog, {Country} from "./AddTabDialog";
import moment from "moment";
import GenericTab from "./GenericTab";
import {Onboarding, Onboardings} from "./Onboarding";
import {getStorageState, saveStorageState, shouldWatchOboarding, UserTab} from "./Storage";
import {validateURL} from "./URLValidator";
import {Alert} from "@material-ui/lab";

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

function App() {
    const classes = tabsUseStyles();

    const [mainTab, setMainTab] = React.useState(getStorageState().tabMain);
    const [userTabs, setUserTabsRaw] = React.useState(getStorageState().userTabs);
    const [editTab, setEditTab] = React.useState();
    const [showAddTabDialog, setShowAddTabDialog] = React.useState(false);
    const [showSnackbar, setShowSnackbar] = React.useState();

    const userTabsTitles = _.map(userTabs, 'flag')
    const tabsDefault = ['Dashboard', 'Analysis', 'Prediction']
    const tabs = [...tabsDefault, ...userTabsTitles]

    useEffect(() => {
        window.scrollTo(0, 0);
        importUserTabFromUrl();
    }, []);

    function importUserTabFromUrl() {
        function parseQuery(url: string = window.location.href): any {
            const queryString = url.split('?')[1];
            const query = {};
            if (queryString) {
                const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
                for (let i = 0; i < pairs.length; i++) {
                    const pair = pairs[i].split('=');
                    // @ts-ignore
                    query[pair[0]] = pair[1] || '';
                }
            }
            return query;
        }

        const {queryCountry, queryflag, queryUrl} = parseQuery();
        if (!!queryUrl) {
            const queryTabIndex = _.findIndex(userTabs, {'url': queryUrl});
            if (queryTabIndex >= 0) {
                if (mainTab !== queryTabIndex) setMainTab(queryTabIndex + tabsDefault.length);
            } else {
                validateURL(queryUrl).then(isValid => {
                    if (isValid) {
                        handleAddTab(queryUrl, {name: queryCountry, flag: decodeURI(queryflag)});
                    } else {
                        console.error('invalid URL: ', queryUrl)
                    }
                });
            }
        }
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        function replaceQuery(query: any, url: string = window.location.href): string {
            return url.split('?')[0] + '?' + Object.keys(query).map(k => `${k}=${query[k]}`).join('&')
        }

        if (newValue >= tabsDefault.length) {
            const queryTab = _.find(userTabs, {'index': newValue - tabsDefault.length}) as UserTab;
            const newUrl = replaceQuery({
                queryCountry: queryTab.country,
                queryflag: queryTab.flag,
                queryUrl: queryTab.url
            })
            if (window.location.href !== newUrl) {
                window.location.href = newUrl
            }
        } else {
            setMainTab(newValue);
            window.location.href = window.location.href.split('?')[0]
        }
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
        saveStorageState({...getStorageState(), userTabs: userTabsObj});
        setUserTabsRaw(userTabsObj);
        setMainTab(tabs.length);
        handleAddTabClose();
        setShowSnackbar(true);
    };

    const handleEditTab = (tab: UserTab) => {
        const index = _.findIndex(userTabs, (v) => v.index === tab.index);
        const newTabs = _.concat(_.slice(userTabs, 0, index), [tab], _.slice(userTabs, index + 1));
        saveStorageState({...getStorageState(), userTabs: newTabs})
        setUserTabsRaw(newTabs)
        setMainTab(tabsDefault.length + index);
        handleAddTabClose()
    };

    const handleRemoveTab = (tab: UserTab) => {
        const newTabs = userTabs.filter(item => item.index !== tab.index)
        saveStorageState({...getStorageState(), userTabs: newTabs})
        setUserTabsRaw(newTabs)
        setMainTab(newTabs.length > 0 ? tabsDefault.length : 0);
        handleAddTabClose()
    };

    const handleAddTabClose = () => {
        setShowAddTabDialog(false);
        setEditTab(undefined);
    };

    function handleTabClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string, index: number) {
        if (event.type === 'click') {
            ReactGA.event({
                category: 'Click',
                action: 'Tab',
                label: name
            });
            saveStorageState({...getStorageState(), tabMain: index})
        } else if (event.type === 'contextmenu') {
            event.preventDefault();
            setEditTab(userTabs[index - tabsDefault.length])
            setShowAddTabDialog(true)
        }
    }

    function buildTabTitle(name: string, index: number, selected: number) {
        const isUserTab = index > tabsDefault.length - 1;
        const userTabsStyles = isUserTab ? {fontSize: '1.3rem', minWidth: 64} : {};
        return <Tab
            onContextMenu={event => handleTabClick(event, name, index)}
            onClick={event => handleTabClick(event, name, index)}
            className={index === selected ? classes.tabSelected : classes.tabDefault}
            label={name} style={{...userTabsStyles}} key={index}
            {...{
                className: `simple-tab-${index}`, id: `simple-tab-${index}`,
                'aria-controls': `simple-tabpanel-${index}`,
            }}/>;
    }

    return <>
        <AppBar position="sticky">
            <Tabs value={mainTab} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                {_.map(tabs, (v, ind) => buildTabTitle(v, ind, mainTab))}
                <IconButton className={`simple-tab-last`} aria-haspopup="true" color="inherit"
                            onClick={handleAddButtonClick}>
                    <AddRoundedIcon/>
                </IconButton>
            </Tabs>
        </AppBar>
        <TabPanel value={mainTab} index={0} key={0}>
            <Dashboard/>
        </TabPanel>
        <TabPanel value={mainTab} index={1} key={1}>
            <Analysis/>
        </TabPanel>
        <TabPanel value={mainTab} index={2} key={2}>
            <Prediction/>
        </TabPanel>
        {_.map(userTabs, ({url}, i) =>
            <TabPanel value={mainTab} index={tabsDefault.length + i} key={tabsDefault.length + i}>
                <GenericTab url={url}/>
            </TabPanel>)}
        {showAddTabDialog &&
        <AddTabDialog isOpen={showAddTabDialog}
                      editTab={editTab}
                      handleSave={handleAddTab}
                      handleEdit={handleEditTab}
                      handleClose={handleAddTabClose}
                      handleRemove={handleRemoveTab}/>
        }
        <Onboarding run={shouldWatchOboarding(Onboardings.MAIN)} type={Onboardings.MAIN}/>
        <Onboarding run={shouldWatchOboarding(Onboardings.USER_TABS_ACTIONS)}
                    type={Onboardings.USER_TABS_ACTIONS}/>
        <Snackbar open={showSnackbar} autoHideDuration={5000}
                  onClose={() => setShowSnackbar(false)}>
            <Alert onClose={() => setShowSnackbar(false)} severity="success">
                New page successfully added to the tab panel!
            </Alert>
        </Snackbar>
    </>
}

export default App;
