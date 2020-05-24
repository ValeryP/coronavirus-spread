import React from 'react';
import {Grid} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
        },
        rootBottom: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(12),
        }
    })
);

function ConfirmedPerCountry() {
    const classes = useStyles();
    return <>
        <Grid container direction="column" className={classes.root}>
            <Grid container item justify="space-evenly" className={classes.root}>
                <Grid item xs={6}>
                    <iframe title={"ConfirmedPerCountry1"}
                            src="https://ourworldindata.org/grapher/total-cases-covid-19"
                            style={{width: '100%', height: 600, border: 0}}/>
                </Grid>
                <Grid item xs={6}>
                    <iframe title={"ConfirmedPerCountry2"}
                            src="https://ourworldindata.org/grapher/daily-cases-covid-19"
                            style={{width: '100%', height: 600, border: 0}}/>
                </Grid>

            </Grid>
            <Grid container item justify="space-evenly" className={classes.rootBottom}>
                <Grid item xs={6}>
                    <iframe title={"ConfirmedPerCountry3"}
                            src="https://ourworldindata.org/grapher/total-confirmed-cases-of-covid-19-per-million-people"
                            style={{width: '100%', height: 600, border: 0}}/>
                </Grid>
                <Grid item xs={6}>
                    <iframe title={"ConfirmedPerCountry4"}
                            src="https://ourworldindata.org/grapher/new-covid-cases-per-million?year=59"
                            style={{width: '100%', height: 600, border: 0}}/>
                </Grid>
            </Grid>
        </Grid>
    </>
}

export default ConfirmedPerCountry;
