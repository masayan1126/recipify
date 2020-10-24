import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { TextInput, PrimaryButton, SelectBox } from "../UIkit/index";
import { useSelector,useDispatch } from 'react-redux';
import { saveCalendar, autoSaveCalendar } from '../../redux/calendar/operations';
import {db, auth, FirebaseTimestamp} from '../../firebase/index';
import {push} from 'connected-react-router'
import { getUserId } from '../../redux/users/selecotors';
import { AutoMakeRecipeCalendar } from './index';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';

const CalendarFlame = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);


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


    // console.log(recipes);


    const converMonth = (month) => {
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
            [dinner, setDinner] = useState(""),
            // [form, setForm] = useState(false);
            [startYear, setStartYear] = useState(""),
            [startMonth, setStartMonth] = useState(""),
            [startDay, setStartDay] = useState(""),
            [endDay, setEndDay] = useState("");

    const inputBreakfast = useCallback((event) => {
        setBreakfast(event.target.value)
    },[setBreakfast])

    const inputLunch = useCallback((event) => {
        setLunch(event.target.value)
    },[setLunch])

    const inputDinner = useCallback((event) => {
        setDinner(event.target.value)
    },[setDinner])

// 

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

    const year = String(targetDate).substring(11, 15);
    let month = String(targetDate).substring(4, 7);
    month = converMonth(month);
    const day = String(targetDate).substring(8, 10);
    let date = `${year}/${month}/${day}`;
    // let dateId = year + month + day
    // window.location.pathname = '/recipe/calendar/' + dateId;
    
    const makeUrl = (event, maxDate) =>　{
        
        // setForm(true);
        const recipeCalendarForm = document.getElementById('recipe-calendar-form')
        recipeCalendarForm.classList.remove("display-toggle");
        // if (form === true) {
        // }

        const year = String(event).substring(11, 15);
        let month = String(event).substring(4, 7);
        month = converMonth(month);
        const day = String(event).substring(8, 10);
        let dateId = year + month + day
        dispatch(push('/recipe/calendar/' + dateId))

        const calendarIds = props.calendar.map((calendar) => calendar.id )
       
        if (calendarIds.includes(dateId)) {
            db.collection('calendar').doc(uid + dateId).get()
                .then((snapshot) => {
                    const data = snapshot.data();
                    // setBreakfast(data.breakfast);
                    // setLunch(data.lunch);
                    setDinner(data.dinner);
                    console.log(data.dinner);
                })
        } else {
            setBreakfast("");
            setLunch("");
            setDinner("");            
        }  
    }

    let id = window.location.pathname.split('/recipe/calendar')[1];
    if(id) {        
        id = id.split('/')[1]
    }

    const autoMakeRecipeCalendar = (startYear, startMonth, startDay, endDay) => {
        dispatch(autoSaveCalendar(id, dinner, startYear, startMonth, startDay, endDay, uid, recipeNameList))
    }

    // useEffect(() => {
    //     console.log(maxDate)
    // },[]);

    
    return (
        <div>
            {/* <span onClick={() => dispatch(push('/recipe/auto'))}>一括登録はこちらから</span> */}
            
            <Calendar
                onChange={setTargetDate}
                // onActiveStartDateChange={initializeDate}
                value={targetDate}
                onClickDay={(event, id,) => makeUrl(event, id) }
                // activeStartDate={activeStartDate}
                // defaultActiveStartDate={defaultActiveStartDate}
                // maxDate={maxDate}
            />

            <div id="recipe-calendar-form" className="display-toggle">
                <h2>登録済みレシピ</h2>
                <TextInput
                    fullWidth={true} label={"日付"} multiline={false} required={true}
                    rows={1} value={date} type={"text"}　
                    InputProps={{
                        readOnly: true,
                    }}
                />
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
                <SelectBox
                    label={"晩ご飯"} required={true} options={recipes} select={setDinner} value={dinner}
                />


                <PrimaryButton 
                    label={"レシピをカレンダーに追加"}
                    onClick={() => dispatch(saveCalendar(id, breakfast, lunch, dinner, date, uid))}
                />
                
            </div>
            <div>
                <h2>レシピ一括登録</h2>
                <TextInput
                    fullWidth={false} label={"年"} multiline={false} required={false}
                    rows={1} value={startYear} type={"number"} 
                    onChange={inputStartYear}
                />
                <TextInput
                    fullWidth={false} label={"月"} multiline={false} required={false}
                    rows={1} value={startMonth} type={"text"} 
                    onChange={inputStartMonth}
                />
                <TextInput
                    fullWidth={false} label={"開始日"} multiline={false} required={false}
                    rows={1} value={startDay} type={"text"} 
                    onChange={inputStartDay}
                />
                <TextInput
                    fullWidth={false} label={"終了日"} multiline={false} required={false}
                    rows={1} value={endDay} type={"text"} 
                    onChange={inputEndDay}
                />
                <PrimaryButton 
                    label={"一括登録"}
                    onClick={() => dispatch(autoSaveCalendar(uid, id, startYear, startMonth, startDay, endDay, recipeNameList))}
                />
            </div>   
        </div>
    );
}
export default CalendarFlame