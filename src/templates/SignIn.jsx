import React ,{useCallback,useState} from 'react';
import { useDispatch } from 'react-redux';
import {TextInput, PrimaryButton} from '../components/UIkit/index'
import {signIn} from '../redux/users/operations';
import {push, goBack} from 'connected-react-router'

const SignIn = () => {
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
        dispatch(signIn(email,password))
    }

    return(
        <div>
            <h3 className="title">サインイン</h3>
            <div className="form-container">
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
                        label={'サインイン'}
                        onClick={() => dispatch(signIn(email,password))}
                    />
                    <p className="p-link-menu" onClick={() => dispatch(push('/signup'))}>アカウントをお持ちでない方はこちら</p>
                    <p className="p-link-menu" onClick={() => dispatch(push('/signin/reset'))}>パスワードをお忘れの方はこちら</p>
                    <p className="p-link-menu" onClick={() => signInGuestUser() }>ゲストユーザーでサインインする</p>
                </div>
            </div>
        </div>
    )
}
export default SignIn