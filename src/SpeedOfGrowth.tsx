import React from 'react';
import {Grid} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        }
    })
);

function SpeedOfGrowth() {
    const classes = useStyles();
    return <>
        <Grid container className={classes.root}>
            <iframe title={"SpeedOfGrowth"}
                    src="https://ourworldindata.org/grapher/covid-confirmed-cases-since-100th-case"
                    style={{width: '99%', height: 600, border: 0}}/>
        </Grid>
    </>
}

export default SpeedOfGrowth;
