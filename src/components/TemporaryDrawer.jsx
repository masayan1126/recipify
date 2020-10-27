import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { SideMenu } from './index';
import {useDispatch} from "react-redux";
import {push, goBack} from 'connected-react-router';
import {signOut} from '../redux/users/operations';
import * as SetIngredients from './ingredients/SetIngredients';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});



const menuList = [
  { id:'home', menuName: 'ホーム', menuLink: '/' },
  { id:'logout', menuName: 'ログアウト', menuLink: '/' },

]

export default function TemporaryDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menuHome = () => {
    dispatch(push('/'))
  }

  const menuEditRecipe = () => {
    dispatch(push('/recipe/edit'))
  }

  const menuMyRecipe = () => {
    dispatch(push('/recipe/myrecipe'))
  }

  const menuEditIngredients = () => {
    dispatch(push('/ingredients/edit'))
  }

  const menuIngredientsList = () => {
    dispatch(push('/ingredients/list'))
  }

  const menuRecipeVideo = () => {
    dispatch(push('/recipe/video'))
  }

  const menuRecipeCalendar = () => {
    dispatch(push('/recipe/calendar'))
  }

  const list = (anchor) => (
    
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <SideMenu primary={'ホーム'} menuAciton={menuHome} />
        <SideMenu primary={'ログアウト'} menuAciton={() => { dispatch(signOut()) }} />
        <SideMenu primary={'レシピの追加/編集'} menuAciton={() => {menuEditRecipe()}} /> 
        <SideMenu primary={'マイレシピ'} menuAciton={() => {menuMyRecipe()}} />
        <SideMenu primary={'食材追加'} menuAciton={() => {menuEditIngredients()}} />
        <SideMenu primary={'食材一覧'} menuAciton={() => {menuIngredientsList()}} />
        <SideMenu primary={'食材から献立'} menuAciton={() => {menuMyRecipe()}} />
        <SideMenu primary={'一括献立'} menuAciton={() => {menuRecipeCalendar()}} />
        <SideMenu primary={'買い物リスト'} menuAciton={() => {menuMyRecipe()}} />
        <SideMenu primary={'レシピ動画'} menuAciton={() => {menuRecipeVideo()}} />
      </List>
      
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
