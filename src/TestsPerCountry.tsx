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

function TestsPerCountry() {
    const classes = useStyles();
    return <>
        <Grid container direction="column" className={classes.root}>
            <Grid container item justify="space-evenly" className={classes.root}>
                <Grid item xs={6}>
                    <iframe title={"TestsPerCountry1"}
                            src="https://ourworldindata.org/grapher/tests-vs-confirmed-cases-covid-19"
                            style={{width: '100%', height: 600, border: 0}}/>
                </Grid>
                <Grid item xs={6}>
                    <iframe title={"TestsPerCountry2"}
                            src="https://ourworldindata.org/grapher/covid-19-tests-country"
                            style={{width: '100%', height: 600, border: 0}}/>
                </Grid>

            </Grid>
            <Grid container item justify="space-evenly" className={classes.rootBottom}>
                <Grid item xs={6}>
                    <iframe title={"TestsPerCountry3"}
                            src="https://ourworldindata.org/grapher/tests-vs-confirmed-cases-covid-19-per-million"
                            style={{width: '100%', height: 600, border: 0}}/>
                </Grid>
                <Grid item xs={6}>
                    <iframe title={"TestsPerCountry4"}
                            src="https://ourworldindata.org/grapher/covid19-tests-per-million-people"
                            style={{width: '100%', height: 600, border: 0}}/>
                </Grid>
            </Grid>
        </Grid>
    </>
}

export default TestsPerCountry;
