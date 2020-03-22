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
import AddTabDialog from "./AddTabDialog";

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

const useStyles = makeStyles((theme: Theme) =>
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
    const classes = useStyles();

    const [cookies, setCookie] = useCookies(['saved-prefs']);
    const [value, setValue] = React.useState(Number(cookies['tab-main']) || 0);
    const [showAddTabDialog, setShowAddTabDialog] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleAddButtonClick = () => {
        setShowAddTabDialog(true)
    };

    const handleAddTab = (url: string) => {
        console.warn("handleAddTab", url);
        handleAddTabClose()
    };

    const handleAddTabClose = () => {
        console.warn("handleAddTabClose");
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

    function buildTabTitle(name: string, index: number, selected: number) {
        return <Tab onClick={() => handleTabClick(name, index)} label={name}
                    className={index === selected ? classes.tabSelected : classes.tabDefault}
                    {...{
                        id: `simple-tab-${index}`,
                        'aria-controls': `simple-tabpanel-${index}`,
                    }} />
    }

    const tabs = ['Prediction', 'Dashboard', 'Analysis']

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <>
        <AppBar position="sticky">
            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                {_.map(tabs, (v, ind) => buildTabTitle(v, ind, value))}
                <IconButton aria-haspopup="true" color="inherit" onClick={handleAddButtonClick}>
                    <AddRoundedIcon/>
                </IconButton>
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <Prediction/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Dashboard/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Analysis/>
        </TabPanel>
        <AddTabDialog isOpen={showAddTabDialog} handleSave={handleAddTab}
                      handleClose={handleAddTabClose}/>
    </>
}

export default App;
