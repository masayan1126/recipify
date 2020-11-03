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
            <h3 className="title">パスワード再登録</h3>
            <div className="form-container">
                <TextInput 
                    fullWidth={true} label={'メールアドレス'}
                    multiline={false} required={true}
                    rows={1} value={email}
                    type={'email'} onChange={inputEmail}
                />
                <div className="spacer-sm"/>
                <div className="spacer-sm"/>
            </div>
                <div className="spacer-sm"/>
                <div className="center">
                    <PrimaryButton 
                        label={'リセットする'}
                        onClick={() => dispatch(resetPassword(email))}
                    />
                    <p className="p-link-menu" onClick={() => dispatch(push('/signin'))}>サインイン画面に戻る</p>
                </div>
            
        </div>
    )
}
export default Reset