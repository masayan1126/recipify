import React,{useCallback, useState, useEffect} from 'react';
import {db} from '../../firebase/index';
import {saveIngredients} from '../../redux/ingredients/operations';
import { useDispatch, useSelector } from 'react-redux';
import {getIngredients} from '../../redux/ingredients/selecotors';
import { getUserId } from '../../redux/users/selecotors';
import {TextInput,PrimaryButton, ImageArea} from "../UIkit/index";
import { SetIngredients } from "./index";
import {push} from 'connected-react-router'

// 食材登録・編集用コンポーネント
const IngredientsEdit = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    // const ingredientsList = getIngredients(selector);
    const uid = getUserId(selector);

    let id = window.location.pathname.split('/ingredients/edit')[1];
    if(id) {        
        id = id.split('/')[1]
    }

    const [ingredientsCategory, setIngredientsCategory] = useState(""),
        [ingredientsList, setIngredientsList] = useState([]),
        [images , setImages] = useState([]);

    const inputingredientsCategory = useCallback((event) => {
        setIngredientsCategory(event.target.value)
    },[setIngredientsCategory])

    // idが空白でない時（編集モードの時）は、DBからデータ取得して表示する
    useEffect(() => {
        if (id !== "") {
            db.collection('users').doc(uid).collection('ingredients').doc(id).get()
                .then((snapshot) => {
                    const data = snapshot.data();
                    setIngredientsCategory(data.ingredientsCategory);
                    const arr = data.ingredientsList[0].value.filter((data) => {
                        return data.name !== "未指定"
                    })
                    console.log(data.ingredientsList[0].value);
                    setIngredientsList(arr)
                    setImages(data.images);
                })
        }
    }, [])

    return(
        <section className="form-container">
            <h3 className="title">食材の登録・編集</h3>
            <ImageArea images={images} setImages={setImages} title={"食材画像の登録"}/>
            <TextInput
                fullWidth={false} label={"カテゴリ(肉類等)"} multiline={false} required={true}
                rows={1} value={ingredientsCategory} type={"text"} onChange={inputingredientsCategory}
            />
            <div className="spacer-sm"/>
            <SetIngredients 
                ingredientsList={ingredientsList} setIngredientsList={setIngredientsList}
                category={ingredientsCategory}
            />
            <div className="spacer-sm"/>
            <div className="center">
                <PrimaryButton
                    label={"食材を追加"}
                    onClick={() => dispatch(saveIngredients(id, ingredientsCategory, ingredientsList, images, uid))}
                    />
                <p className="p-link-menu" onClick={() => dispatch(push('/ingredients/list'))}>＞ 一覧画面に戻る</p>
            </div>
        </section>
    )
}
export default IngredientsEdit