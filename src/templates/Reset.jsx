import React ,{useCallback,useState} from 'react';
import { useDispatch } from 'react-redux';
import {TextInput, PrimaryButton} from '../components/UIkit/index'
import {resetPassword} from '../redux/users/operations';
import {push, goBack} from 'connected-react-router'

const Reset = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);

    return(
        <div>
            <h2>サインイン</h2>
            <TextInput 
                fullWidth={true} label={'メールアドレス'}
                multiline={false} required={true}
                rows={1} value={email}
                type={'email'} onChange={inputEmail}
            />
            <PrimaryButton 
                label={'パスワードをリセットする'}
                onClick={() => dispatch(resetPassword(email))}
            />
            <p onClick={() => dispatch(push('/signin'))}>サインイン画面に戻る</p>
        </div>
    )
}
export default Reset