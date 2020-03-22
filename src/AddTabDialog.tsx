import React from 'react';
import {createStyles, makeStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import emojiFlags from 'emoji-flags';
import _ from "lodash";
import {CircularProgress, Fade, Grid, Slide, TextField, Zoom} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TransitionProps} from "@material-ui/core/transitions";

const styles = (theme: Theme) => createStyles({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
})

const useStyles = makeStyles((theme: Theme) => createStyles({
        textSuccess: {
            color: theme.palette.success.dark
        },
        textError: {
            color: theme.palette.error.dark
        },
        saveButton: {
            color: theme.palette.primary.dark,
        },
    }),
);

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Country {
    name: string,
    flag: string
}

const countryToEmojiMap = _.map(emojiFlags.data, ({name, emoji}) => ({
    name: name,
    flag: emoji
} as Country))

export default function AddTabDialog({isOpen, handleSave, handleClose}: { isOpen: boolean, handleSave: (url: string) => void, handleClose: () => void }) {
    const classes = useStyles();

    const [country, setCountry] = React.useState();
    const [validUrl, setValidUrl] = React.useState();
    const [url, setUrl] = React.useState();
    const [loading, setLoading] = React.useState();

    function handleCountrySelected({target: {value} = ''}: any) {
        setCountry(_.find(countryToEmojiMap, (v: Country) => v.name === value))
    }

    function buildAutocomplete() {
        return <Autocomplete
            id="country-select"
            style={{width: 300}}
            options={countryToEmojiMap}
            autoHighlight
            onSelect={handleCountrySelected}
            getOptionLabel={option => option.name}
            renderOption={(c: Country) => (<><span>{c.flag}</span>{c.name}</>)}
            renderInput={params => (
                <TextField {...params}
                           label="Choose your country" variant="outlined"
                           inputProps={{...params.inputProps, autoComplete: 'new-password'}}/>
            )}
        />;
    }

    function handleUrlChange({target: {value}}: any) {
        const corsProxy = 'https://cors-anywhere.herokuapp.com/'
        setLoading(true)
        setUrl(value)
        fetch(corsProxy + value, {method: 'HEAD'})
            .then((res) => {
                setValidUrl(res.ok)
            }, (err) => {
                console.error(err)
            })
            .then(() => setTimeout(() => setLoading(false), 2000))
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}
                TransitionComponent={Transition} keepMounted fullWidth>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add your website
            </DialogTitle>
            <DialogContent dividers style={{minHeight: 200}}>
                <Grid container direction={"column"} alignItems="center" justify="center"
                      style={{minHeight: 200}} spacing={2}>
                    <Typography variant={"caption"} style={{margin: 16, textAlign: 'center'}}>
                        You can add your own country website which you're following.
                        It will be saved as a bookmark in the top bar of this page.
                        Feel free to add multiple countries.
                    </Typography>
                    <Grid item xs container spacing={1} justify={"center"}>
                        {country && <>
                            <Grid item xs={2} style={{textAlign: 'end'}}>
                                <Zoom in={country}>
                                    <Typography variant={"h3"}>
                                        <span aria-label={"flag " + country.name} role={"img"}>
                                            {country?.flag}
                                        </span>
                                    </Typography>
                                </Zoom>
                            </Grid>
                        </>}
                        <Grid item>
                            {buildAutocomplete()}
                        </Grid>
                    </Grid>
                    {country &&
                    <Grid item style={{width: '100%'}}>
                        <TextField fullWidth variant="outlined"
                                   label="Insert URL of your website"
                                   onChange={handleUrlChange}/>
                    </Grid>}
                    {loading &&
                    <Fade in={loading} unmountOnExit
                          style={{transitionDelay: loading ? '300ms' : '0ms'}}>
                        <Grid item spacing={1} container justify={"center"}
                              style={{width: '100%'}}>
                            <Grid item xs={1} style={{textAlign: 'end'}}>
                                <CircularProgress size={20}/>
                            </Grid>
                            <Grid item>
                                <Typography variant={"body1"}>Checking URL status...</Typography>
                            </Grid>
                        </Grid>
                    </Fade>}
                    {!loading && url && (validUrl
                        ? <Grid item style={{width: '100%'}} container justify={"center"}>
                            <Typography variant={"body1"} className={classes.textSuccess}>
                                <span aria-label={"happy"} role={"img"}>😊</span>
                                Great. URL is valid!
                            </Typography>
                        </Grid>
                        : <Grid item style={{width: '100%'}} container justify={"center"}>
                            <Typography variant={"body1"} className={classes.textError}>
                                <span aria-label={"sad"} role={"img"}>😿</span>
                                Inserted URL is not valid. Try another one, please.
                            </Typography>
                        </Grid>)}
                </Grid>
            </DialogContent>
            {validUrl && !loading &&
            <DialogActions>
                <Button onClick={() => handleSave(url)} className={classes.saveButton}
                        variant="contained" color={"secondary"}>Save</Button>
            </DialogActions>}
        </Dialog>
    );
}
