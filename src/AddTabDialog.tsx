import React from 'react';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
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
import {Grid, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

const styles = (theme: Theme) =>
    createStyles({
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
    });

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

interface Country {
    name: string,
    flag: string
}

const countryToEmojiMap = _.map(emojiFlags.data, ({name, emoji}) => ({
    name: name,
    flag: emoji
} as Country))

export default function AddTabDialog({isOpen, handleSave, handleClose}: { isOpen: boolean, handleSave: () => void, handleClose: () => void }) {
    const [country, setCountry] = React.useState();

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

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add your website
            </DialogTitle>
            <DialogContent dividers>
                <Grid container>
                    <Grid item>
                        <Typography variant={"h3"}>{country?.flag || ''}</Typography>
                    </Grid>
                    <Grid item>
                        {buildAutocomplete()}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">Cancel</Button>
                <Button autoFocus onClick={handleSave} color="secondary">Save changes</Button>
            </DialogActions>
        </Dialog>
    );
}
