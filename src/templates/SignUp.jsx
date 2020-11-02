import React ,{useCallback,useState} from 'react';
import { useDispatch } from 'react-redux';
import {TextInput, PrimaryButton} from '../components/UIkit/index'
import {signUp} from '../redux/users/operations';
import {push, goBack} from 'connected-react-router'

const SignUp = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState(''),
          [email, setEmail] = useState(''),
          [password, setPassword] = useState(''),
          [confirmPassword, setConfirmPassword] = useState('');

    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    },[setUsername]);

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword]);

    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.value)
    },[setConfirmPassword]);

    return(
        <div>
            <h3 className="title">アカウント登録</h3>
            <div className="form-container">
                <TextInput 
                    fullWidth={true} label={'ユーザー名'}
                    multiline={false} required={true}
                    rows={1} value={username}
                    type={'text'} onChange={inputUsername}
                />
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
                <TextInput 
                    fullWidth={true} label={'確認用パスワード'}
                    multiline={false} required={true}
                    rows={1} value={confirmPassword}
                    type={'password'} onChange={inputConfirmPassword}
                />
                <div className="spacer-sm"/>
                <div className="center">
                    <PrimaryButton 
                        label={"登録する"}
                        onClick={() => dispatch(signUp(username,email,password,confirmPassword))}
                    />
                    <p className="p-link-menu" onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</p>
                </div>
            </div>
        </div>
    )
}
export default SignUp