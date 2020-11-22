import React, { useState, useEffect, useCallback } from 'react';
import 'react-calendar/dist/Calendar.css';
import { TextInput, PrimaryButton } from "../UIkit/index";
import {push} from 'connected-react-router'
import { useSelector,useDispatch } from 'react-redux';
import { getUserId } from '../../redux/users/selecotors';
import {fetchRecommendedRecipe} from '../../redux/recipes/operations';
import {getRecipes} from '../../redux/recipes/selecotors';
import { autoSaveCalendar, fetchCalendar } from '../../redux/calendar/operations';
import Loading from "../../Loading";

// レシピカレンダー一括作成用画面(親コンポーネント)
const AutoMakeRecipeCalendar = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const recipes = getRecipes(selector);
    const recipeNameList = recipes.map((data) => data.recipeName)

    let [startYear, setStartYear] = useState(""),
    [startMonth, setStartMonth] = useState(""),
    [startDay, setStartDay] = useState(""),
    [endDay, setEndDay] = useState(""),
    [loading, setLoading] = useState(false);

    // 対象期間の入力(TextInputのコンポーネントに渡す関数)
    const inputStartYear = useCallback((event) => {
        setStartYear(event.target.value)
    },[setStartYear])
    
    // 対象期間の入力(TextInputのコンポーネントに渡す関数)
    const inputStartMonth = useCallback((event) => {
        setStartMonth(event.target.value)
    },[setStartMonth])

    // 対象期間の入力(TextInputのコンポーネントに渡す関数)
    const inputStartDay = useCallback((event) => {
        setStartDay(event.target.value)
    },[setStartDay])

    // 対象期間の入力(TextInputのコンポーネントに渡す関数)
    const inputEndDay = useCallback((event) => {
        setEndDay(event.target.value)
    },[setEndDay])

    const dt =　new Date();
    var nowYear = dt.getFullYear();

    const autoSaveRecipeCalendar = (uid, startYear, startMonth, startDay, endDay, recipeNameList) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            dispatch(autoSaveCalendar(uid, startYear, startMonth, startDay, endDay, recipeNameList))
        }, 3500);    
    }

    useEffect(() => {
        setStartYear(nowYear)
        dispatch(fetchCalendar(uid))
        dispatch(fetchRecommendedRecipe(uid))
    }, [])

    return (
        <section className="fadein__bottom__fast">
            { loading == true ? <Loading /> : 
            <>
                <div className="form-container text-center">
                    <div className="spacer-sm"/>
                    <h3 className="title">レシピ一括登録</h3>
                    <TextInput
                        fullWidth={true} label={"年"} multiline={false} required={true}
                        rows={1} value={startYear} type={"number"} 
                        onChange={inputStartYear}
                    />
                    <TextInput
                        fullWidth={true} label={"月"} multiline={false} required={true}
                        rows={1} value={startMonth} type={"number"} 
                        onChange={inputStartMonth}
                        InputProps={{
                            inputProps: { 
                                max: 12, min: 1 
                            }
                        }}
                    />
                    <TextInput
                        fullWidth={true} label={"開始日"} multiline={false} required={true}
                        rows={1} value={startDay} type={"number"} 
                        onChange={inputStartDay}
                        InputProps={{
                            inputProps: { 
                                max: 31, min: 1 
                            }
                        }}
                    />
                    <TextInput
                        fullWidth={true} label={"終了日"} multiline={false} required={true}
                        rows={1} value={endDay} type={"number"} 
                        onChange={inputEndDay}
                        InputProps={{
                            inputProps: { 
                                max: 31, min: 1 
                            }
                        }}
                    />
                    <div className="spacer-sm"/>
                    <div className="center">
                        <PrimaryButton 
                            label={"一括登録"}
                            onClick={() => autoSaveRecipeCalendar(uid, startYear, startMonth, startDay, endDay, recipeNameList)}
                        />
                        <p className="p-link-menu" onClick={() => dispatch(push('/recipe/calendar'))}>＞ カレンダーに戻る</p>
                    </div>
                    <div className="spacer-sm"/>
                </div> 
            </>
            }  
        </section>
    );
}
export default AutoMakeRecipeCalendar