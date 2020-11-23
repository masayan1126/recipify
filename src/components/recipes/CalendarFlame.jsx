import React,{useCallback, useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { TextInput, PrimaryButton, SelectBox } from "../UIkit/index";
import { useSelector,useDispatch } from 'react-redux';
import { addCalendar } from '../../redux/calendar/operations';
import {push} from 'connected-react-router'
import { getUserId } from '../../redux/users/selecotors';
import { db } from '../../firebase/index';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({

}));

const CalendarFlame = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);

    // 登録済みレシピから、登録可能候補となる晩ご飯のレシピ一覧（options）の生成
    const recipes = []
    const recipeNameList = props.recipes.map((data) => data.recipeName)
    const recipeIdList = props.recipes.map((data) => data.id)


    for (let i = 0; i < props.recipes.length; i += 1) {
        const recipeObj = {
          id: `${recipeIdList[i]}`,
          name: recipeNameList[i],
        };
        recipes.push(recipeObj)
    }

    // 選択した月(month)の表記を条件分岐で英語から日本語に変換
    const convertMonth = (month) => {
        switch (month) {
            case "Jan": month = "1"; break;
            case "Feb": month = "2"; break;
            case "Mar": month = "3"; break;
            case "Apl": month = "4"; break;
            case "May": month = "5"; break;
            case "Jue": month = "6"; break;
            case "Jul": month = "7"; break;
            case "Aue": month = "8"; break;
            case "Sep": month = "9"; break;
            case "Oct": month = "10"; break;
            case "Nov": month = "11"; break;
            case "Dec": month = "12"; break;
        }
        return month;
    }

    const [targetDate, setTargetDate] = useState(new Date()),
            [breakfast, setBreakfast] = useState(""),
            [lunch, setLunch] = useState(""),
            [dinner, setDinner] = useState("");


    // 朝、昼ごはんの入力
    const inputBreakfast = useCallback((event) => {
        setBreakfast(event.target.value)
    },[setBreakfast])

    const inputLunch = useCallback((event) => {
        setLunch(event.target.value)
    },[setLunch])

    // date変数(今選択している日付のYYYY/MM/DD)の生成
    const year = String(targetDate).substring(11, 15);
    let month = String(targetDate).substring(4, 7);
    month = convertMonth(month);
    const day = String(targetDate).substring(8, 10);
    let date = `${year}/${month}/${day}`;
    let dateId = year + month + day;

    const getCalendarRecipe = async (dateId, calendarIds) => {
        // ログインユーザーのカレンダーコレクションから全ドキュメントを取得し、
        // 各ドキュメントに紐づく日付id(YYYYMMDD)の配列を生成
        
        console.log(calendarIds);
        // 上記の配列の中に、現在選択している日付id(YYYYMMDD)と一致するデータがあれば、それを表示する
        if (calendarIds.includes(dateId)) {
            const targetCalendar = await props.calendar.filter(calendar => calendar.dateId == dateId)
            setBreakfast(targetCalendar[0].breakfast);
            setLunch(targetCalendar[0].lunch);
            setDinner(targetCalendar[0].dinner);
        } else {
            db.collection("users")
            setBreakfast("");
            setLunch("");
            setDinner("");            
        }  
    } 
    
    // /recipe/calendar/日付　の「日付」部分を選択した日付でURLを生成する関数
    const makeUrl = async (event) =>　{
        // どこかの日付を選択したら、レシピの登録フォームを表示する
        const recipeCalendarForm = document.getElementById('recipe-calendar-form')
        recipeCalendarForm.classList.remove("display-toggle");
        // 選択した日付をYYMMDD形式に調整する
        const year = String(event).substring(11, 15);
        let month = String(event).substring(4, 7);
        month = convertMonth(month);
        if (month.length == 1) {
            month = `0${month}`
        }
        const day = String(event).substring(8, 10);
        dateId = year + month + day
        const calendarIds = props.calendar.map((calendar) => calendar.dateId )
        await dispatch(push('/recipe/calendar/' + dateId))
        await getCalendarRecipe(dateId, calendarIds);

    }

    // 入力されたデータをDBに保存するための関数(operationsを呼び出して、引数を渡すための関数)
    const addRecipeCalendar = (dinner, uid, date, dateId, breakfast, lunch) => {
        const data = {
            dinner: dinner,
            userId: uid,
            date: date,
            dateId: dateId,
        }

        if (breakfast == "") {
            data.breakfast = ""
        } else {
            data.breakfast = breakfast
        }

        if (lunch == "") {
            data.lunch = ""
        } else {
            data.lunch = lunch
        }

        dispatch(addCalendar(data))
    }    

    useEffect(() => {
        const targetData = db.collection('users').doc(uid).collection("calendar")
            .where('dateId', '==', dateId).get()
            .then(snapshots => {
                snapshots.forEach((snapshot => {
                    setDinner(snapshot.data().dinner);
                }))
            })
    },[]);
    
    return (
        <section className="form-container">
            <Calendar className="recipe-calendar fadein__bottom__fast"
                onChange={setTargetDate}
                // YYMMDD形式の日付に変換される前の生の日付
                value={targetDate}
                onClickDay={(event) => makeUrl(event) }
            />
            <div className="spacer-xs"/>
            <div id="recipe-calendar-form" 
                // className="display-toggle"
            >
                <div className="">
                    <TextInput
                        fullWidth={true} label={"日付"} multiline={false} required={true}
                        rows={1} value={date} type={"text"}　
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <div className="spacer-xs"/>
                    <details>
                    <summary>朝・昼ご飯</summary>
                    <TextInput
                        fullWidth={true} label={"朝ごはん"} multiline={false} required={false}
                        rows={1} value={breakfast} type={"text"} 
                        onChange={inputBreakfast}
                    />
                    <TextInput
                        fullWidth={true} label={"昼ごはん"} multiline={false} required={false}
                        rows={1} value={lunch} type={"text"} 
                        onChange={inputLunch}
                    />
                    </details>
                    <div className="spacer-xs"/>
                    <SelectBox
                        label={"晩ご飯"} required={true} options={recipes} select={setDinner} value={dinner}
                    />
                    <div className="spacer-sm"/>
                    <div className="center">
                        <PrimaryButton 
                            label={"レシピを登録"}
                            onClick={() => addRecipeCalendar(dinner, uid, date, dateId, breakfast, lunch)}
                        />
                        <p className="p-link-menu" onClick={() => dispatch(push('/recipe/auto'))}>
                            一括登録はこちらから
                        </p>
                    </div>    
                </div>
            </div>
        </section>
    );
}
export default CalendarFlame