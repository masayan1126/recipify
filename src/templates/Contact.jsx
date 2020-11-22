import React,{useCallback, useState, useEffect} from 'react';
import {TextInput, PrimaryButton} from '../components/UIkit/index'
import {signIn} from '../redux/users/operations';
import { useDispatch, useSelector } from 'react-redux';
import {push, goBack} from 'connected-react-router'
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import {db} from '../firebase/index';
import { getUserId, getUsername, getUserProfileImage } from "../redux/users/selecotors";
import { ScannerSharp } from '@material-ui/icons';
import  webhookUrl from '../webhook/webhookUrl';

const useStyles = makeStyles((theme) => ({
    simpleSignin: {
        textAlign: "right",
        fontSize: "8px",
    }
}));

const Contact = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);

    const [username, setUsername] = useState(''),
          [email, setEmail] = useState(''),
          [inquiry, setInquiry] = useState('');

    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    },[setUsername]);

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);

    const inputInquiry = useCallback((event) => {
        setInquiry(event.target.value)
    },[setInquiry]);

    const submitForm = (username, email, inquiry) => {
        const payload = {
            text: 'お問い合わせがありました\n'
                + 'お名前: ' + username + '\n'
                + 'メールアドレス: ' + email + '\n'
                + '【問い合わせ内容】\n' + inquiry
        };

        

        // fetchメソッドでフォームの内容をSlackのIncoming Webhook URL に送信する
        fetch(webhookUrl, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(() => {
            alert('送信が完了しました。追ってご連絡いたします');
            setInquiry("")
        })
        // e.preventDefault()
        // let data = {}
        // data.name = username
        // data.email = email
        // data.content = inquiry
        // let addDefaultRecipes = firebase.functions().httpsCallable('addDefaultRecipes');
        // addDefaultRecipes(recipeDataset, uid)
        // setUsername("")
        // setEmail("");
        // setInquiry("")
      }

    useEffect(() => {
        db.collection('users').doc(uid).get()
            .then(snapshot => {
                const data = snapshot.data()
                setUsername(data.username)
                setEmail(data.email)
            })

    }, [])

    return(
        <>
            <div className="form-container text-center fadein__bottom__fast">
                <div className="spacer-sm"/>
                <h3 className="title">お問い合わせ</h3>
                <div className="spacer-sm"/>
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
                    // variant="outlined"
                    // variant="filled"


                />
                <TextInput
                    fullWidth={true} label={'お問い合わせ内容'}
                    multiline={true} required={true}
                    rows={5} value={inquiry}
                    type={'text'} onChange={inputInquiry}
                    // variant="filled"
                />
                {/* <div className="spacer-sm"/> */}
                <div className="spacer-sm"/>
                <div className="center">
                    <PrimaryButton
                        label="問い合わせする"
                        onClick={() => submitForm(username, email, inquiry)}
                    />
                </div>
                <div className="spacer-sm"/>
            </div>

        </>
    )
}
export default Contact
