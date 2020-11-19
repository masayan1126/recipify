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
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EventIcon from '@material-ui/icons/Event';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ListAltIcon from '@material-ui/icons/ListAlt';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import KitchenIcon from '@material-ui/icons/Kitchen';
import SmsIcon from '@material-ui/icons/Sms';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

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

  const menuFavoriteRecipe = () => {
    dispatch(push('/recipe/favorite'))
  }

  const menuRecipeBot = () => {
    dispatch(push('/recipe/bot'))
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
  
  const menuSearchIngredients = () => {
    dispatch(push("/recipe/search/ingredients"))
  }

  const menuProfile = () => {
    dispatch(push("/profile"))
  }

  const menuContact = () => {
    dispatch(push("/contact"))
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
      <List className="p-link-menu">
        <ListItem Button> 
          {/* <SideMenu primary={'Recipify'}/> */}
          <h2>Recipify</h2>
        </ListItem>

        <ListItem Button> 
          <HomeIcon/>
          <SideMenu primary={'ホーム'} menuAciton={() => menuHome()} />
        </ListItem>

        <ListItem Button> 
          <EditIcon/>
          <SideMenu primary={'レシピの追加/編集'} menuAciton={() => {menuEditRecipe()}} /> 
        </ListItem>

        <ListItem Button> 
          <FavoriteIcon/>
          <SideMenu primary={'お気に入りレシピ'} menuAciton={() => {menuFavoriteRecipe()}} />
        </ListItem>

        <ListItem Button> 
          <EventIcon/>
          <SideMenu primary={'献立カレンダー'} menuAciton={() => {menuRecipeCalendar()}} />
        </ListItem>

        <ListItem Button>
          <RestaurantMenuIcon/>
          <SideMenu primary={'食材から献立'} menuAciton={() => {menuSearchIngredients()}} />
        </ListItem>

        <ListItem Button>
          <SmsIcon/>
          <SideMenu primary={'献立くん'} menuAciton={() => {menuRecipeBot()}} />
        </ListItem>

        <ListItem Button>
          <ListAltIcon/>
          <SideMenu primary={'(作成中)買い物リスト'} menuAciton={() => {menuFavoriteRecipe()}} />
        </ListItem>

        <ListItem Button>
          <OndemandVideoIcon/>
          <SideMenu primary={'(作成中)レシピ動画'} menuAciton={() => {menuRecipeVideo()}} />
        </ListItem>

        <ListItem Button>
          <KitchenIcon/>
          <SideMenu primary={'食材一覧'} menuAciton={() => {menuIngredientsList()}} />
        </ListItem>

        <Divider />

        <ListItem Button> 
          <ExitToAppIcon />
          <SideMenu primary={'ログアウト'} menuAciton={() => { dispatch(signOut()) }} />
        </ListItem>

        <ListItem Button> 
          <AccountBoxIcon />
          <SideMenu primary={'アカウント情報'} menuAciton={() => menuProfile() } />
        </ListItem>

        <ListItem Button>
          <MailIcon/>
          <SideMenu primary={'お問い合わせ'} menuAciton={() => {menuContact()}} />
        </ListItem>
      </List>
      
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
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
