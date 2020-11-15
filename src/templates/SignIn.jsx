import React ,{useCallback,useState} from 'react';
import { useDispatch } from 'react-redux';
import {TextInput, PrimaryButton} from '../components/UIkit/index'
import {signIn} from '../redux/users/operations';
import {push, goBack} from 'connected-react-router'
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    simpleSignin: {
        textAlign: "right",
        fontSize: "8px",
    }
    
}));

const SignIn = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [email, setEmail] = useState(''),
          [password, setPassword] = useState('');

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword]);

    const signInGuestUser = () => {
        setEmail("matsushin@gmail.com");
        setPassword("matsushin");
    }

    return(
        <div>
            <div className="form-container text-center">
                <h3 className="title">サインイン</h3>
                <div className="spacer-sm"/>
                <TextInput 
                    fullWidth={true} label={'メールアドレス'}
                    multiline={false} required={true}
                    rows={1} value={email}
                    type={'email'} onChange={inputEmail}
                    // variant="outlined"
                    variant="filled"
                    
                    
                />
                <TextInput 
                    fullWidth={true} label={'パスワード'}
                    multiline={false} required={true}
                    rows={1} value={password}
                    type={'password'} onChange={inputPassword}
                    variant="filled"
                />
                {/* <div className="spacer-sm"/> */}
                <div className="spacer-sm"/>
                <div className="center">
                    <PrimaryButton 
                        label={'サインイン'}
                        onClick={() => dispatch(signIn(email,password))}
                    />
                    <p className="p-link-menu" onClick={() => dispatch(push('/signup'))}>アカウントをお持ちでない方はこちら</p>
                    <p className="p-link-menu" onClick={() => dispatch(push('/signin/reset'))}>パスワードをお忘れの方はこちら</p>
                    {/* <MenuItem className={classes.simpleSignin}> */}
                        {/* <ListItemIcon className={classes.simpleSignin}> */}
                            {/* <PersonIcon /> */}
                        {/* </ListItemIcon> */}
                    <div className="spacer-sm"/>
                        <p className={classes.simpleSignin}
                            onClick={() => signInGuestUser() }>かんたんログインで試す</p>
                    {/* </MenuItem> */}
                </div>

            </div>
        </div>
    )
}
export default SignIn