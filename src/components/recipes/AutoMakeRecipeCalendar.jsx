import React, { useState, useEffect, useCallback } from 'react';
import 'react-calendar/dist/Calendar.css';
import { TextInput, PrimaryButton } from "../UIkit/index";
import {push} from 'connected-react-router'
import { useSelector,useDispatch } from 'react-redux';
import { getUserId } from '../../redux/users/selecotors';
import {fetchRecommendedRecipe} from '../../redux/recipes/operations';
import {getRecipes} from '../../redux/recipes/selecotors';
import { autoSaveCalendar, fetchCalendar } from '../../redux/calendar/operations';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    width: {
        width: "70%"
    }
}));

// レシピカレンダー一括作成用画面(親コンポーネント)
const AutoMakeRecipeCalendar = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

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

    useEffect(() => {
        dispatch(fetchCalendar(uid))
        dispatch(fetchRecommendedRecipe(uid))
    }, [])

    return (
        <>
            <h3 className="title">レシピ一括登録</h3>
            <div className="form-container text-center">
                <TextInput
                    fullWidth={false} label={"年"} multiline={false} required={true}
                    rows={1} value={startYear} type={"number"} 
                    onChange={inputStartYear}
                    variant="outlined"
                    size="small"
                />
                <TextInput
                    fullWidth={false} label={"月"} multiline={false} required={true}
                    rows={1} value={startMonth} type={"text"} 
                    onChange={inputStartMonth}
                    variant="outlined"
                />
                <TextInput
                    fullWidth={false} label={"開始日"} multiline={false} required={true}
                    rows={1} value={startDay} type={"text"} 
                    onChange={inputStartDay}
                    variant="outlined"
                />
                <TextInput
                    fullWidth={false} label={"終了日"} multiline={false} required={true}
                    rows={1} value={endDay} type={"text"} 
                    onChange={inputEndDay}
                    variant="filled"
                />
            </div> 
                <div className="spacer-sm"/>
                <div className="center">
                    <PrimaryButton 
                        label={"一括登録"}
                        onClick={() => dispatch(autoSaveCalendar(uid, startYear, startMonth, startDay, endDay, recipeNameList))}
                    />
                    <p className="p-link-menu" onClick={() => dispatch(push('/recipe/calendar'))}>＞ カレンダーに戻る</p>
                </div>
                
        </>
    );
}
export default AutoMakeRecipeCalendar