import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { TextInput, PrimaryButton, SelectBox } from "../UIkit/index";
import { useSelector,useDispatch } from 'react-redux';
import { saveCalendar, autoSaveCalendar } from '../../redux/calendar/operations';
import {db, auth, FirebaseTimestamp} from '../../firebase/index';
import {push} from 'connected-react-router'
import { getUserId } from '../../redux/users/selecotors';
import {fetchRecommendedRecipe} from '../../redux/recipes/operations';
import {getRecipes} from '../../redux/recipes/selecotors';
import { fetchCalendar } from '../../redux/calendar/operations';
import HelpIcon from '@material-ui/icons/Help';

const AutoMakeRecipeCalendar = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const recipes = getRecipes(selector);
    const recipeNameList = recipes.map((data) => data.recipeName)

    const [startYear, setStartYear] = useState(""),
    [startMonth, setStartMonth] = useState(""),
    [startDay, setStartDay] = useState(""),
    [endDay, setEndDay] = useState("");


    // 対象期間の入力(自動作成のコンポーネントに渡す関数)
    const inputStartYear = useCallback((event) => {
        setStartYear(event.target.value)
    },[setStartYear])
    
    const inputStartMonth = useCallback((event) => {
        setStartMonth(event.target.value)
    },[setStartMonth])

    const inputStartDay = useCallback((event) => {
        setStartDay(event.target.value)
    },[setStartDay])

    const inputEndDay = useCallback((event) => {
        setEndDay(event.target.value)
    },[setEndDay])
    
    
    const autoMakeRecipeCalendar = (startYear, startMonth, startDay, endDay) => {
        dispatch(autoSaveCalendar(id, startYear, startMonth, startDay, endDay, uid, recipeNameList))
    }
    
    // const recipes = []
    // const recipeNameList = props.recipes.map((data) => data.recipeName)
    // const recipeIdList = props.recipes.map((data) => data.id)
    // for (let i = 0; i < props.recipes.length; i += 1) {
    //     const recipeObj = {
    //       id: `${recipeIdList[i]}`,
    //       name: recipeNameList[i],
    //     };
    //     recipes.push(recipeObj)
    // }

    // const converMonth = (month) => {
    //     switch (month) {
    //         case "Jan": month = "1"; break;
    //         case "Feb": month = "2"; break;
    //         case "Mar": month = "3"; break;
    //         case "Apl": month = "4"; break;
    //         case "May": month = "5"; break;
    //         case "Jue": month = "6"; break;
    //         case "Jul": month = "7"; break;
    //         case "Aue": month = "8"; break;
    //         case "Sep": month = "9"; break;
    //         case "Oct": month = "10"; break;
    //         case "Nov": month = "11"; break;
    //         case "Dec": month = "12"; break;
    //     }
    //     return month;
    // }

    // const [targetDate, setTargetDate] = useState(new Date()),
    //         [breakfast, setBreakfast] = useState(""),
    //         [lunch, setLunch] = useState(""),
    //         [dinner, setDinner] = useState(""),
            // [startYear, setStartYear] = useState(""),
            // [startMonth, setStartMonth] = useState(""),
            // [startDay, setStartDay] = useState(""),
            // [endDay, setEndDay] = useState("");

    // const inputBreakfast = useCallback((event) => {
    //     setBreakfast(event.target.value)
    // },[setBreakfast])

    // const inputLunch = useCallback((event) => {
    //     setLunch(event.target.value)
    // },[setLunch])

    // const inputDinner = useCallback((event) => {
    //     setDinner(event.target.value)
    // },[setDinner])

// 

    // const inputStartYear = useCallback((event) => {
    //     setStartYear(event.target.value)
    // },[setStartYear])
    
    // const inputStartMonth = useCallback((event) => {
    //     setStartMonth(event.target.value)
    // },[setStartMonth])

    // const inputStartDay = useCallback((event) => {
    //     setStartDay(event.target.value)
    // },[setStartDay])

    // const inputEndDay = useCallback((event) => {
    //     setEndDay(event.target.value)
    // },[setEndDay])

    // const year = String(targetDate).substring(11, 15);
    // let month = String(targetDate).substring(4, 7);
    // const day = String(targetDate).substring(8, 10);
    // let date = `${year}/${month}/${day}`;
    // let dateId = year + month + day
    // window.location.pathname = '/recipe/calendar/' + dateId;
    
    const makeUrl = (event, maxDate) =>　{
        
        // setForm(true);
        // const recipeCalendarForm = document.getElementById('recipe-calendar-form')
        // recipeCalendarForm.classList.remove("display-toggle");
        // if (form === true) {
        // }

        // const year = String(event).substring(11, 15);
        // let month = String(event).substring(4, 7);
        // const day = String(event).substring(8, 10);
        // let dateId = year + month + day
        // dispatch(push('/recipe/calendar/' + dateId))

        // const calendarIds = props.calendar.map((calendar) => calendar.id )
       
        // if (calendarIds.includes(dateId)) {
        //     db.collection('calendar').doc(uid + dateId).get()
        //         .then((snapshot) => {
        //             const data = snapshot.data();
        //             // setBreakfast(data.breakfast);
        //             // setLunch(data.lunch);
        //             setDinner(data.dinner);
        //         })
        // } else {
        //     setBreakfast("");
        //     setLunch("");
        //     setDinner("");            
        // }  
    }

    let id = window.location.pathname.split('/recipe/calendar')[1];
    if(id) {        
        id = id.split('/')[1]
    }

    // const autoMakeRecipeCalendar = (startYear, startMonth, startDay, endDay) => {
    //     dispatch(autoSaveCalendar(id, dinner, startYear, startMonth, startDay, endDay, uid, recipeNameList))
    // }

    // useEffect(() => {
    // },[]);

    useEffect(() => {
        dispatch(fetchCalendar(uid))
        dispatch(fetchRecommendedRecipe(uid))
    }, [])

    return (
        <>
          <div className="form-container">
                <h3 className="title">レシピ一括登録</h3>
                <TextInput
                    fullWidth={true} label={"年"} multiline={false} required={false}
                    rows={1} value={startYear} type={"number"} 
                    onChange={inputStartYear}
                />
                <TextInput
                    fullWidth={true} label={"月"} multiline={false} required={false}
                    rows={1} value={startMonth} type={"text"} 
                    onChange={inputStartMonth}
                />
                <TextInput
                    fullWidth={true} label={"開始日"} multiline={false} required={false}
                    rows={1} value={startDay} type={"text"} 
                    onChange={inputStartDay}
                />
                <TextInput
                    fullWidth={true} label={"終了日"} multiline={false} required={false}
                    rows={1} value={endDay} type={"text"} 
                    onChange={inputEndDay}
                />
                <div className="spacer-sm"/>
                <div className="center">
                    <PrimaryButton 
                        label={"一括登録"}
                        onClick={() => dispatch(autoSaveCalendar(uid, id, startYear, startMonth, startDay, endDay, recipeNameList))}
                    />
                    <p className="p-link-menu" onClick={() => dispatch(push('/recipe/calendar'))}>＞ カレンダーに戻る</p>
                </div>
            </div>     
        </>
    );
}
export default AutoMakeRecipeCalendar