import React from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    marginLeft: {
        marginLeft: "3px"
    }
})

const SideMenu = (props) => {

    const dispatch = useDispatch();
    const classes = useStyles()
    

    return(
        <>
            
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText className={classes.marginLeft} primary={props.primary} onClick={props.menuAciton}/>
            
        </>
    )
}
export default SideMenu
