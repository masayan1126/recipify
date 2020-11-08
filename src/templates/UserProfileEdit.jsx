import React,{useCallback, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {db, auth, FirebaseTimestamp} from '../firebase/index';
import {TextInput, SelectBox, PrimaryButton} from "../components/UIkit/index";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import { getUserId, getUserProfileImage} from "../redux/users/selecotors";
import { Modal } from "./index";
import {getRecipes} from '../redux/recipes/selecotors';
import {push} from 'connected-react-router';
import {fetchUserProfileImage} from "../redux/users/operations";


const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      
    },
    center: {
        // textAlign: "center",
        margin: "0 auto"
    },
    input: {
        width: "80%",
        margin: "0 auto",
        textAlign: "center"
    },
    editIcon: {
        marginRight: 0,
    },
    dialogWidth: {
        width:"700px",
      },
  }));

const UserProfile = (props) => {
    const classes = useStyles();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const dispatch = useDispatch();
    const profileImage = getUserProfileImage(selector);
    // const userName = "masayan"
    const recipes = getRecipes(selector);


    const inputUserName = (event) => {

    }
    
    const handleClickOpen = () => {
      props.setOpen(true);
    };
    const handleClose = (username, images) => {
        if (images > 1) {
            alert("登録できる画像は１つまでです")
            return;
        }

        props.setOpen(false);
        const usersRef = db.collection('users').doc(uid);
        usersRef.update({
            username: username,
            userProfileImage: images,
        })
    };


    const editProfile = () => {
        handleClickOpen()
    }


    

    return(
        <section>
                <Modal className={classes.dialogWidth}
                    open={props.open}
                    setOpen={props.setOpen}
                    handleClose={handleClose}
                    userName={props.userName}
                    setUserName={props.setUserName}
                    inputUserName={props.inputUserName}
                    
                />
                <div className="form-container">
                <div className="text-right">
                    <EditIcon onClick={() => editProfile()} />
                </div>
            <List>
                <ListItem>
                    <ListItemAvatar className={classes.center}>
                        {props.profileImage !== "" ? (
                            <Avatar alt="icon" className={classes.large} src={props.profileImage} /> 
                         ) : (
                            <Avatar alt="icon" className={classes.large} src="/static/images/cards/no-profile.png" />
                         )}
                    </ListItemAvatar>
                </ListItem>
                <ListItem button>
                    <TextInput 
                        fullWidth={true} 
                        label="ユーザー名"
                        className={classes.input}
                        value={props.userName}
                        onChange={props.inputUserName}
                        type={"text"} 
                    />
                </ListItem>
                {/* <ListItem button>
                    <ListItemText  className="text-center" primary={`ログイン日数：${props.userName}`} />
                </ListItem>
                <Divider className={classes.divider} /> */}
                <ListItem button>
                    <TextInput 
                        fullWidth={true} 
                        InputProps={{
                            readOnly: true,
                        }}
                        className={classes.input}
                        value={`登録済みレシピの数：${props.recipes.length}`}
                        
                        type={"text"} 
                    />
                </ListItem>
                {/* <ListItemLink href="#simple-list">
                    <ListItemText primary="Spam" />
                </ListItemLink> */}
            </List>
            </div>
        </section>
    )
}
export default UserProfile