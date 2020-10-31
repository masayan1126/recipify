import React,{useCallback, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import { Chat } from './index';
import List from '@material-ui/core/List';

const useStyles = makeStyles(() =>
    createStyles({
        "chats": {
            height: "400px",
            padding: "0",
            overflow: "auto"
        }
    }),
);

const Chats = (props) => {
    const classes = useStyles();
    const selector = useSelector((state) => state);
    return(
        <List className={classes.chats} id={"scroll-area"}>
            {props.chats.map((chat, index) => {
                return <Chat text={chat.text} type={chat.type} key={index} />
            })}
        </List>
    )
}
export default Chats