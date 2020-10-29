import React,{useCallback, useState, useEffect} from 'react';
import {db, auth, FirebaseTimestamp} from '../../firebase/index';
import {fetchIngredients, saveIngredients} from '../../redux/ingredients/operations';
import { useDispatch, useSelector } from 'react-redux';
import {getIngredients} from '../../redux/ingredients/selecotors';
import {TextInput, SelectBox, PrimaryButton, ImageArea} from "../UIkit/index";
import { SetIngredients, Ingredients } from "./index";
import {push, goBack} from 'connected-react-router'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const IngredientsEdit = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const ingredientsList = getIngredients(selector);

    let id = window.location.pathname.split('/ingredients/edit')[1];
    if(id) {        
        id = id.split('/')[1]
        
    }

    const [ingredientsCategory, setIngredientsCategory] = useState(""),
        // [ingredientsNameOne, setIngredientsNameOne] = useState(""),
        // [ingredientsNameTwo, setIngredientsNameTwo] = useState(""),
        // [ingredientsNameThree, setIngredientsNameThree] = useState(""),
        // [ingredientsNameFour, setIngredientsNameFour] = useState(""),
        // [ingredientsNameFive, setIngredientsNameFive] = useState(""),
        [ingredients, setIngredients] = useState([]),
        [images , setImages] = useState([]);

    const inputingredientsCategory = useCallback((event) => {
        setIngredientsCategory(event.target.value)
    },[setIngredientsCategory])

    // const inputIngredientsNameOne = useCallback((event) => {
    //     setIngredientsNameOne(event.target.value)
    // },[setIngredientsNameOne])

    // const inputIngredientsNameTwo = useCallback((event) => {
    //     setIngredientsNameTwo(event.target.value)
    // },[setIngredientsNameTwo])

    // const inputIngredientsNameThree = useCallback((event) => {
    //     setIngredientsNameThree(event.target.value)
    // },[setIngredientsNameThree])

    // const inputIngredientsNameFour = useCallback((event) => {
    //     setIngredientsNameFour(event.target.value)
    // },[setIngredientsNameFour])

    // const inputIngredientsNameFive = useCallback((event) => {
    //     setIngredientsNameFive(event.target.value)
    // },[setIngredientsNameFive])

    useEffect(() => {
        
        // dispatch(fetchIngredients())
        if (id !== "") {
            db.collection('ingredients').doc(id).get()
                .then((snapshot) => {
                    const data = snapshot.data();
                    setIngredientsCategory(data.ingredientsCategory);
                    setIngredients(data.ingredientsList)
                    setImages(data.images);
                })
        }
    }, [])

    return(
        <div>
            <h3 className="title">食材の追加</h3>
            <div className="form-container">
                <ImageArea images={images} setImages={setImages} title={"食材画像の登録"}/>
                <TextInput
                    fullWidth={true} label={"食材のカテゴリ(肉類、魚類等)"} multiline={false} required={true}
                    rows={1} value={ingredientsCategory} type={"text"} onChange={inputingredientsCategory}
                />
                <div className="spacer-sm"/>
                {/* <TextInput
                    fullWidth={true} label={"食材名1"} multiline={false} required={true}
                    rows={1} value={ingredientsNameOne} type={"text"} onChange={inputIngredientsNameOne}
                />
                <TextInput
                    fullWidth={true} label={"食材名2"} multiline={false} required={true}
                    rows={1} value={ingredientsNameTwo} type={"text"} onChange={inputIngredientsNameTwo}
                />
                <TextInput
                    fullWidth={true} label={"食材名3"} multiline={false} required={true}
                    rows={1} value={ingredientsNameThree} type={"text"} onChange={inputIngredientsNameThree}
                />
                <TextInput
                    fullWidth={true} label={"食材名4"} multiline={false} required={true}
                    rows={1} value={ingredientsNameFour} type={"text"} onChange={inputIngredientsNameFour}
                />
                <TextInput
                    fullWidth={true} label={"食材名5"} multiline={false} required={true}
                    rows={1} value={ingredientsNameFive} type={"text"} onChange={inputIngredientsNameFive}
                /> */}
                <SetIngredients 
                    ingredientsList={ingredients} setIngredients={setIngredients}
                />
            </div>
            <div className="spacer-sm"/>
            <div className="center">
                <PrimaryButton
                    label={"食材を追加"}
                    onClick={() => dispatch(saveIngredients(id, ingredientsCategory, ingredients, images))}
                />
                <p className="p-link-menu" onClick={() => dispatch(push('/ingredients/list'))}>＞ 一覧画面に戻る</p>
            </div>

        </div>
    )
}
export default IngredientsEdit