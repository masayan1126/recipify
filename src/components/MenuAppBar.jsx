import React,{useCallback, useState, useEffect} from 'react';
import { TemporaryDrawer } from './index'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from "@material-ui/core/Avatar";
import {push} from 'connected-react-router';
import {fetchUserProfileImage} from "../redux/users/operations";
import { getUserId, getUserProfileImage, getSignedIn} from "../redux/users/selecotors";
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  Navbar: {
    position: 'fixed',
    top: 0,
    zIndex:999,
    // backgroundColor:'#EB8A3E',
    backgroundColor:'#fff',
    // backgroundColor:'#785A46',
    // justifyContent: "right !important",
    padding: "0 0 0 16px",
  },
  menuButton : {
    padding: "0",
  }
}));

const MenuAppBar = (props) => {
  const classes = useStyles();
  // const [auth, setAuth] = React.useState(true);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const isSignedIn = getSignedIn;
  // const dispatch = useDispatch();
  // const selector = useSelector((state) => state);
  // console.log(props.uid);

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <>
      <AppBar position="" className={classes.Navbar} >
        <Toolbar >
          <img src="https://recipify-e1b95.web.app/favicon.ico" height="40px" width="40px" alt=""/>
          {/* <Typography variant="h6" className={classes.title}>
            <a href="" className={classes.headerLogo} >Recipify</a>
          </Typography> */}
          <IconButton className={classes.menuButton} edge="start" aria-label="menu">
            <TemporaryDrawer />
          </IconButton>
          
        </Toolbar>
      </AppBar>
    </>
  );
}

export default MenuAppBar