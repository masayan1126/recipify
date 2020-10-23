import React from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {useDispatch} from "react-redux";

const SideMenu = (props) => {

    const dispatch = useDispatch();

    return(
        <ListItem Button key={props.key} onClick={props.menuAciton}> 
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={props.primary} />
        </ListItem>
    )
}
export default SideMenu
