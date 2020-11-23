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
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles((theme) => ({
    simpleSignin: {
        textAlign: "right",
        fontSize: "8px",
    }
}));

const About = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);

    const [username, setUsername] = useState('');

    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    },[setUsername]);

    useEffect(() => {
        db.collection('users').doc(uid).get()
            .then(snapshot => {
                const data = snapshot.data()
                setUsername(data.username)
            })
    }, [])

    return(
        <>
            <div className="form-container fadein__bottom__fast">
                {/* <div className="spacer-sm"/> */}
                {/* <h3 className="text-left title">Recette(ルセッテ)について</h3> */}
                <h3 className="text-left">{username}様</h3>
                <p className="text-left">この度はRecette(ルセッテ)をご利用いただき、ありがとうございます</p>
                <p className="text-left">こちらのアプリは、「献立の効率化」を目的としており、画面右上のメニューバーを押すと、様々な便利機能を利用いただけます</p>
                <p className="text-left">ご利用上の不明点や機能追加に関する依頼については、お問い合わせメニューより受け付けております</p>
                <div className="text-right">
                    <img src="https://recipify-e1b95.web.app/favicon.ico" height="40px" width="40px" alt=""/>
                </div>
                {/* <details>
                    <summary>レシピの登録、編集などがしたい</summary>
                    <ListItem > 
                        <EditIcon/>
                        レシピの追加/編集から可能です
                    </ListItem>
                </details>
                <details>
                    <summary>登録したレシピを一覧で見たい</summary>
                    <ListItem > 
                        <HomeIcon/>
                        ホームから可能です
                    </ListItem>
                </details>
                <details>
                    <summary>カレンダーに登録/編集などがしたい</summary>
                    <ListItem > 
                        <EventIcon/>
                        献立カレンダーから可能です
                    </ListItem>
                </details>
                <details>
                    <summary>お気に入りレシピ一覧の作成</summary>
                </details> */}
            </div>

        </>
    )
}
export default About
