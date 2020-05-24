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
import {UserTab} from "../utils/Storage";
import {validateURL} from "../utils/URLValidator";

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

export interface Country {
    name: string,
    flag: string
}

const countryToEmojiMap = _.map(emojiFlags.data, ({name, emoji}) => ({
    name: name,
    flag: emoji
} as Country))

export default function AddTabDialog({isOpen, editTab, handleSave, handleClose, handleEdit, handleRemove}: { isOpen: boolean, editTab: UserTab, handleSave: (url: string, country: Country) => void, handleClose: () => void, handleRemove: (tab: UserTab) => void, handleEdit: (tab: UserTab) => void }) {
    const classes = useStyles();
    const [country, setCountry] = React.useState(editTab ? {
        name: editTab.country,
        flag: editTab.flag
    } as Country : undefined);

    const [validUrl, setValidUrl] = React.useState(!!editTab);
    const [url, setUrl] = React.useState(editTab ? editTab.url : undefined);
    const [loading, setLoading] = React.useState();

    function resetState() {
        setCountry(undefined)
        setValidUrl(false)
        setUrl(undefined)
        setLoading(undefined)
    }

    function onDialogClosed() {
        handleClose()
        resetState();
    }

    function onSaveClicked() {
        if (!!editTab) {
            handleEdit({...editTab, url: url!!, country: country?.name!!, flag: country?.flag!!})
        } else {
            handleSave(url!!, country!!);
        }
        resetState();
    }

    function onRemoveClicked() {
        handleRemove(editTab);
        resetState();
    }

    function handleCountrySelected({target: {value}}: any) {
        setCountry(_.find(countryToEmojiMap, (v: Country) => v.name === value))
    }

    function buildAutocomplete() {
        return <Autocomplete
            id="country-select"
            style={{width: 300}}
            options={countryToEmojiMap}
            defaultValue={country}
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
        setLoading(true)
        setUrl(value)
        validateURL(value)
            .then(setValidUrl)
            .then(() => setTimeout(() => setLoading(false), 2000))
    }

    return (
        <Dialog onClose={onDialogClosed} aria-labelledby="customized-dialog-title" open={isOpen}
                TransitionComponent={Transition} fullWidth>
            <DialogTitle id="customized-dialog-title" onClose={onDialogClosed}>
                {editTab ? "Edit" : "Add"} your website
            </DialogTitle>
            <DialogContent dividers style={{minHeight: 200}}>
                <Grid container direction={"column"} alignItems="center" justify="center"
                      style={{minHeight: 200}} spacing={2}>
                    <Typography variant={"caption"} style={{margin: 16, textAlign: 'center'}}>
                        Each country has its own country website with more detailed data.
                        You can add the URL of your favorite website and it will be saved as a
                        bookmark in the top bar of this page.
                    </Typography>
                    <Grid item xs container spacing={1} justify={"center"}>
                        {!!country && <>
                            <Grid item xs={2} style={{textAlign: 'end'}}>
                                <Zoom in={!!country}>
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
                    {!!country &&
                    <Grid item style={{width: '100%'}}>
                        <TextField fullWidth variant="outlined" value={url}
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
                                <Typography variant={"body1"}>Checking inserted URL...</Typography>
                            </Grid>
                        </Grid>
                    </Fade>}
                    {!loading && !!url && (validUrl
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
                {!!editTab &&
                <Button onClick={onRemoveClicked} className={classes.saveButton}>Remove</Button>}
                <Button onClick={onSaveClicked} className={classes.saveButton}
                        variant="contained" color={"secondary"}>Save</Button>
            </DialogActions>}
        </Dialog>
    );
}
