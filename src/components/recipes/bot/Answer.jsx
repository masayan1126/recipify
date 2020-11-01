import React,{useCallback, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() =>
    createStyles({
        "button": {
            borderColor: "#EBB582",
            color: "#EBB582",
            fontWeight: 600,
            marginBottom: "8px",
            "&:hover": {
                backgroundColor: "#EBB582",
                color: "#fff"
            }
        }
    }),
);

const Answer = (props) => {
    const classes = useStyles();
    
    const selector = useSelector((state) => state);
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