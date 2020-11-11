import React,{useCallback, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnswersList, Chats } from './index';
import defaultDataset from '../../../dataset';
import {push} from 'connected-react-router';
import {addBotResult} from "../../../redux/bot/operations";

const RecipeBot = () => {
    const selector = useSelector((state) => state);
    const dispatch = useDispatch();

    const [answers, setAnswers] = useState([]),
          [chats, setChats] = useState([]),
          [currentId, setCurrentId] = useState('init'),
          [dataset, setDataset] = useState({}),
        //  選択結果
          [results, setResults] = useState([]);

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

    // 回答が選択された時に呼ばれる関数（選択した項目をResultに格納する）
    const selectAnswer = useCallback((selectedAnswer, nextQuestionId) => {
        addResults({
            "id": nextQuestionId,
            "answer":selectedAnswer
        })

        switch (true) {
            // 「結果を確認する」が選択された場合
            case (nextQuestionId === 'result'):
                dispatch(addBotResult(results));
                dispatch(push("/recipe/bot/recommend"));
                break;
            default:
                // 現在のチャット一覧を取得
                addChats({
                    text: selectedAnswer,
                    type: 'answer'
                })

                setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]),1000)
                break;
        }
    },[answers]);

    // 最初の質問をチャットエリアに表示する
    useEffect(() => {
        (async() => {
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
            {/* <h3 className="title">献立くん</h3> */}
            <div className="chat-box">
                <Chats chats={chats} />
                <AnswersList answers={answers} select={selectAnswer}/>
            </div>
        </section>
    )
}
export default RecipeBot