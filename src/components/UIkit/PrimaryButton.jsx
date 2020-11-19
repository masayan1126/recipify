import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    'button': {
        // backgroundColor: "#D24136",
        // backgroundColor: "#E29930",
        backgroundColor: "#55423d",
        color: '#fffffe !important',
        fontSize: 14,
        height :40,
        marginBottom: 13,
        width: "100%",
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