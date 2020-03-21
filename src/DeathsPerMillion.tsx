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

function DeathsPerMillion() {
    const classes = useStyles();
    return <>
        <Grid container justify="space-evenly" className={classes.root}>
            <Grid item xs={5}>
                <iframe title={"DeathsPerMillion1"}
                        src="https://ourworldindata.org/grapher/total-covid-deaths-per-million"
                        style={{width: '100%', height: 600, border: 0}}/>
            </Grid>
            <Grid item xs={7}>
                <iframe title={"DeathsPerMillion2"}
                        src="https://ourworldindata.org/grapher/new-covid-deaths-per-million"
                        style={{width: '100%', height: 600, border: 0}}/>
            </Grid>

        </Grid>
    </>
}

export default DeathsPerMillion;
