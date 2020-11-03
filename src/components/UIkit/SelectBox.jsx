import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 7,
        minWidth: 100,
        width: "100%",
        fontSize: "8px"
    }
}));

const SelectBox = (props) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel >{props.label}</InputLabel>
            <Select
                value={props.value} required={props.required}
                onChange={(e) => props.select(e.target.value)}

            >
                {props.options.map((value) => {
                    return <MenuItem key={value.id} value={value.name}>{value.name}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
};

export default SelectBox