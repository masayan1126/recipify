import React,{useCallback, useState, useEffect} from 'react';
import {TextInput, PrimaryButton} from '../components/UIkit/index'
import {signIn} from '../redux/users/operations';
import { useDispatch, useSelector } from 'react-redux';
import {push, goBack} from 'connected-react-router'
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import {db} from '../firebase/index';
import { getUserId, getUsername, getUserProfileImage } from "../redux/users/selecotors";
import { ScannerSharp } from '@material-ui/icons';
import  webhookUrl from '../webhook/webhookUrl';
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles((theme) => ({
    simpleSignin: {
        textAlign: "right",
        fontSize: "8px",
    }
}));

const NoData = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);

    // const [username, setUsername] = useState('');

    // const inputUsername = useCallback((event) => {
    //     setUsername(event.target.value)
    // },[setUsername]);

    // useEffect(() => {
    //     db.collection('users').doc(uid).get()
    //         .then(snapshot => {
    //             const data = snapshot.data()
    //             setUsername(data.username)
    //         })
    // }, [])

    return(
        <>
            <div className="form-container fadein__bottom__fast">

          {/* <div className="spacer-lg"/>
          <div className="spacer-lg"/> */}
          <p className="nothing__message">{props.message}</p>
          <div className="center">
            <p className="p-link-menu"
              onClick={props.onClick}>{props.linkMenu}
            </p>
            <img className="img-trimming" src={props.operateFigure} alt=""/>
          </div>
            </div>

        </>
    )
}
export default NoData
