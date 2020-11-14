import React from 'react';
import logo from './logo.svg';
import { MenuAppBar,Header, Title } from './components/index';
import SimpleContainer from './components/SimpleContainer';
import { makeStyles } from '@material-ui/core/styles';
import Router from './Router';
import { useSelector,useDispatch } from 'react-redux';
import { signInAction } from './redux/users/actions';
import './assets/styles/style.css';
import { getUserId, getUserProfileImage, getSignedIn} from "./redux/users/selecotors";
import {MuiThemeProvider} from "@material-ui/core/styles";
import {createMuiTheme} from '@material-ui/core/styles';


const theme = createMuiTheme({ 
  typography: {
    fontFamily: "ヒラギノ丸ゴ ProN Hiragino Maru Gothic ProN sans-serif !important",
  },
  input: {
    fontFamily: "ヒラギノ丸ゴ ProN Hiragino Maru Gothic ProN sans-serif !important",
  },
  inputbase: {
    fontFamily: "ヒラギノ丸ゴ ProN Hiragino Maru Gothic ProN sans-serif !important",
  },
}); 

const useStyles = makeStyles({
  container: {
    width: '95%',
    margin: '0 auto',
    // paddingTop: '70px',
  },
});

function App() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  const classes = useStyles();

  return (
    <div className="pt-small">
      <MuiThemeProvider theme={theme}> 
        <div className="App">
            <MenuAppBar uid={uid} />
            <div className={classes.container}>
              <Router />
            </div>
        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
