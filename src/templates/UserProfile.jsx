import React,{useCallback, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {db} from '../firebase/index';
import { makeStyles } from '@material-ui/core/styles';
import { getUserId, getUsername, getUserProfileImage } from "../redux/users/selecotors";
import { UserProfileEdit } from "./index";
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
        margin: "0 auto"
    },
    divider: {
        width: "80%",
        margin: "0 auto"
    },
    editIcon: {
        marginRight: 0,
    }
  }));

const UserProfile = () => {
    const classes = useStyles();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    // const userName = "masayan"
    const recipes = getRecipes(selector);
    const name = getUsername(selector);
    const dispatch = useDispatch();
    const profileImage = getUserProfileImage(selector);

    const [open, setOpen] = useState(false),
          [userName, setUserName] = useState(""),  
          [loginDays, setLoginDays] = useState(""),
          [numberOfRecipes, setNumberOfRecipes] = useState("");

    const editProfile = () => {
        dispatch(push('/profile/edit/' + uid))
    }

    const inputUserName = useCallback((event) => {
        setUserName(event.target.value)
    },[])

    useEffect(() => {
        const usersRef = db.collection('users').doc(uid);
        usersRef.get()
            .then(snapshot => {
                const data = snapshot.data();
                setUserName(data.username);
                console.log(userName);

            })
        
    }, [])

    useEffect(() => {
        const usersRef = db.collection('users').doc(uid);
        dispatch(fetchUserProfileImage(uid));
    }, [open])

    return(
        <section>
            <UserProfileEdit
                setOpen={setOpen}
                open={open}
                userName={userName}
                setUserName={setUserName}
                inputUserName={inputUserName}
                recipes={recipes}
                profileImage={profileImage.payload}
            />
        </section>
    )
}
export default UserProfile