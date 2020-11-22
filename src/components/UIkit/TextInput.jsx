import React from 'react';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    margin: {
        margin: 0
    },
    fontFamily: {
        fontFamily: "ヒラギノ丸ゴ ProN Hiragino Maru Gothic ProN sans-serif",
    }
})


const TextInput = (props) => {
    const classes = useStyles();

    return(
        <TextField
            className={classes.fontFamily}
            fullWidth={props.fullWidth}
            label={props.label}
            margin="dense"
            multiline={props.multiline}
            required={props.required}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
            InputProps={props.InputProps}
            size={props.size}
            variant={props.variant}
            id={props.id}
        />
    )
}
export default TextInput