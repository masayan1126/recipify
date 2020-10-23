import React from 'react';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    margin: {
        margin: 0
    }
})


const TextInput = (props) => {
    const classes = useStyles();

    return(
        <TextField 
            // className={textStyle}
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
        />
    )
}
export default TextInput