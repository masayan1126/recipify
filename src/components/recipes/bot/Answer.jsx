import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() =>
    createStyles({
        "button": {
            borderColor: "#898280",
            border:"2px solid #898280",
            color: "white !important",
            fontWeight: 600,
            marginBottom: "8px",
            backgroundColor: "#898280",
            "&:hover": {
                backgroundColor: "#271c19",
                color: "white !important"
            }
        }
    }),
);

const Answer = (props) => {
    const classes = useStyles();

    return(
        <Button
            className={classes.button} variant="outlined"
            onClick={() => props.select(props.answer.content, props.answer.nextId)}
        >
            {props.answer.content}
        </Button>
    )
}
export default Answer