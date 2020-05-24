import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Container, Divider} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: 200,
            paddingRight: 200,
        },
        img: {
            margin: theme.spacing(2),
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
            width: '100%'
        }
    })
);

function SymptomsAndFatality() {
    const classes = useStyles();
    return <>
        <Container className={classes.root}>
            <img className={classes.img} alt={""}
                 src={'https://ourworldindata.org/uploads/2020/03/Coronavirus-Symptoms-%E2%80%93-WHO-joint-mission-2-1536x823.png'}/>
            <Divider/>
            <img className={classes.img} alt={""}
                 src={'https://ourworldindata.org/uploads/2020/03/Severity-of-coronavirus-cases-in-China-1-1536x1322.png'}/>
            <Divider/>
            <img className={classes.img} alt={""}
                 src={'https://ourworldindata.org/uploads/2020/03/Coronavirus-CFR-by-age-in-China-1.png'}/>
            <Divider/>
            <img className={classes.img} alt={""}
                 src={'https://ourworldindata.org/uploads/2020/03/Coronavirus-CFR-by-health-condition-in-China.png'}/>
            <Divider/>
            <img className={classes.img} alt={""}
                 src={'https://ourworldindata.org/uploads/2020/03/Covid-19-CFR-by-age-vs.-US-Seasonal-Flu-3.png'}/>
        </Container>
    </>
}

export default SymptomsAndFatality;
