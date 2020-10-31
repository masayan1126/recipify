import React,{useCallback, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Answer } from './index';

const useStyles = makeStyles({
    margin: {
        margin: 0
    }
})

const AnswersList = (props) => {
    const classes = useStyles();
    const selector = useSelector((state) => state);
    return(
        <div className="chat-grid__answer">
            {props.answers.map((key, index) => {
                return <Answer answer={props.answers[index]} key={index.toString()} select={props.select} />
            })} 
        </div>
    )
}
export default AnswersList