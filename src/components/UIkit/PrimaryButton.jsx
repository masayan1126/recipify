import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    'button': {
        backgroundColor: "#D24136",
        color: '#FFF',
        fontSize: 14,
        height :44,
        marginBottom: 16,
        width: 200,
    }
})

const PrimaryButton = (props) => {
    const classes = useStyles();

    return (
        <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
            {props.label}

        </Button>
    )
}
export default PrimaryButton