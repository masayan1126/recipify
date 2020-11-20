import React ,{useCallback,useState} from 'react';
import { useDispatch } from 'react-redux';
import {TextInput, PrimaryButton} from '../components/UIkit/index'
import {signIn} from '../redux/users/operations';
import {push} from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles';

// デモユーザーでログインするリンクのスタイル
const useStyles = makeStyles((theme) => ({
    demoSignin: {
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
        <section>
            <div className="form-container">
                <div className="spacer-sm"/>
                <h3 className="title">サインイン</h3>
                <TextInput
                    fullWidth={true} label={'メールアドレス'}
                    multiline={false} required={true}
                    rows={1} value={email}
                    type={'email'} onChange={inputEmail}  
                />
                <TextInput 
                    fullWidth={true} label={'パスワード'}
                    multiline={false} required={true}
                    rows={1} value={password}
                    type={'password'} onChange={inputPassword}
                />
                <div className="spacer-sm"/>
                <div className="center">
                    <PrimaryButton 
                        label={'サインインする'}
                        onClick={() => dispatch(signIn(email,password))}
                    />
                <div className="spacer-sm"/>
                <p className="p-link-menu" onClick={() => dispatch(push('/signup'))}>アカウントをお持ちでない方はこちら</p>
                <p className="p-link-menu" onClick={() => dispatch(push('/signin/reset'))}>パスワードをお忘れの方はこちら</p>
                <div className="spacer-sm"/>
                    <p className={classes.demoSignin}
                        onClick={() => signInGuestUser() }>デモユーザーでサインイン</p>
                <div className="spacer-sm"/>
            </div>

            </div>
        </section>
    )
}
export default SignIn