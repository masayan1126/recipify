import React,{useCallback, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {db, auth, FirebaseTimestamp} from '../../../firebase/index';
import { AnswersList, Chats } from './index';
import defaultDataset from '../../../dataset';
// import {FormDialog} from "./components/Forms/index";
import {push} from 'connected-react-router';
import {addBotResult} from "../../../redux/bot/operations";

const useStyles = makeStyles({
    margin: {
        margin: 0
    }
})

const RecipeBot = () => {
    const classes = useStyles();
    const selector = useSelector((state) => state);
    const dispatch = useDispatch();

    const [answers, setAnswers] = useState([]);            // 回答コンポーネントに表示するデータ
    const [chats, setChats] = useState([]);                // チャットコンポーネントに表示するデータ
    const [currentId, setCurrentId] = useState('init');    // 現在の質問ID
    const [dataset, setDataset] = useState({});            // 質問と回答のデータセット
    const [open, setOpen] = useState(false);               // 問い合わせフォーム用モーダルの開閉を管理
    const [results, setResults] = useState([]);

    // 問い合わせフォーム用モーダルを開くCallback関数
    const handleOpen = useCallback(() => {
        setOpen(true)
    },[setOpen]);

    // 問い合わせフォーム用モーダルを閉じるCallback関数
    const handleClose = useCallback(() => {
        setOpen(false)
    },[setOpen]);

    // 新しいチャットを追加するCallback関数
    const addChats = useCallback((chat) => {
        setChats(prevChats => {
            return [...prevChats, chat]
        })
    },[setChats]);

    const addResults = useCallback((result) => {
        setResults(prevResults => {
            return [...prevResults, result]
        })
    },[setResults]);

    // 次の質問をチャットエリアに表示する関数
    const displayNextQuestion = (nextQuestionId, nextDataset) => {
        // 選択された回答と次の質問をチャットに追加
        addChats({
            text: nextDataset.question,
            type: 'question'
        });

        // 次の回答一覧をセット
        setAnswers(nextDataset.answers)

        // 現在の質問IDをセット
        setCurrentId(nextQuestionId)
    }

    // 回答が選択された時に呼ばれる関数
    const selectAnswer = useCallback((selectedAnswer, nextQuestionId) => {
        addResults({
            "id": nextQuestionId,
            "answer":selectedAnswer
        })

        switch (true) {
            // お問い合わせが選択された場合
            case (nextQuestionId === 'result'):
                dispatch(addBotResult(results));
                dispatch(push("/recipe/bot/recommend"));
                break;

            // リンクが選択された時
            case /^https:*/.test(nextQuestionId):
                const a = document.createElement('a');
                a.href = nextQuestionId;
                a.target = '_blank';
                a.click();
                break;

            // 選択された回答をchatsに追加
            default:
                // 現在のチャット一覧を取得
                addChats({
                    text: selectedAnswer,
                    type: 'answer'
                })

                
                

                setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 750)
                break;
        }
    },[answers]);

    // 最初の質問をチャットエリアに表示する
    useEffect(() => {
        (async() => {
            const initDataset = {};

            // Fetch questions dataset from Firestore
            // await db.collection('questions').get().then(snapshots => {
            //     snapshots.forEach(doc => {
            //         initDataset[doc.id] = doc.data()
            //     })
            // });

            // Firestoreから取得したデータセットを反映
            setDataset(defaultDataset);

            // 最初の質問を表示
            displayNextQuestion(currentId, defaultDataset[currentId])
        })();
    }, []);

    // 最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
    useEffect(() => {
        const scrollArea = document.getElementById('scroll-area');
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    });

    return(
        <section className="chat-container">
            <h3 className="title">献立くん</h3>
            <div className="chat-box">
                <Chats chats={chats} />
                <AnswersList answers={answers} select={selectAnswer}/>
                {/* <FormDialog open={open} handleOpen={handleOpen} handleClose={handleClose}/> */}
            </div>
        </section>
    )
}
export default RecipeBot