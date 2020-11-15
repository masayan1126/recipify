import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {getUserProfileImage, getUserId} from "../../../redux/users/selecotors";
import {fetchUserProfileImage} from "../../../redux/users/operations";

const Chat = (props) => {
    const selector = useSelector((state) => state);
    const profileImage = getUserProfileImage(selector);
    const uid = getUserId(selector);
    const dispatch = useDispatch()
    const isQuestion = (props.type === 'question');
    const classes = isQuestion ? "p-chat__row" : "p-chat__reverse";

    useEffect(() => {
        dispatch(fetchUserProfileImage(uid));

    }, [])

    console.log(profileImage.payload);

    return (
        <ListItem className={classes}>
            <ListItemAvatar>
                {isQuestion ? (
                    <Avatar alt="icon" src="/static/images/cards/献立くん.jpg" />
                ) : (
                    <Avatar alt="icon" src={profileImage.payload} />
                )}
            </ListItemAvatar>
            <div className="p-chat__bubble">{props.text}</div>
        </ListItem>
    );
}
export default Chat