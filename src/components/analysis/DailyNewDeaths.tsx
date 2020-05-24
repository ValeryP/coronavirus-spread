import React from 'react';
import {Grid} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
        }
    })
);

function DailyNewDeaths() {
    const classes = useStyles();
    return <>
        <Grid container justify="space-evenly" className={classes.root}>
            <Grid item xs={6}>
                <iframe title={"DailyNewDeaths1"}
                        src="https://ourworldindata.org/grapher/daily-deaths-covid-19"
                        style={{width: '100%', height: 600, border: 0}}/>
            </Grid>
            <Grid item xs={6}>
                <iframe title={"DailyNewDeaths2"}
                        src="https://ourworldindata.org/grapher/total-deaths-covid-19"
                        style={{width: '100%', height: 600, border: 0}}/>
            </Grid>

        </Grid>
    </>
}

export default DailyNewDeaths;
