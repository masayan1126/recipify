import React,{ useCallback, useState, useEffect } from 'react';
import {TextInput, SelectBox, PrimaryButton} from "../UIkit/index";
import { useSelector,useDispatch } from 'react-redux';
import { saveRecipe } from '../../redux/recipes/operations';
import ImageArea from '../UIkit/ImageArea';
import { db } from '../../firebase/index';
import '../../assets/styles/style.css';
import { getUserId } from '../../redux/users/selecotors';
import { vegs, meats, fishes, cereals, potatoes_starches_beans_mushrooms } from '../../ingredients';

const RecipeEdit = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    let id = window.location.pathname.split('/recipe/edit')[1];
    
    if(id) {        
        id = id.split('/')[1]
    }

    const [recipeName, setRecipeName] = useState(""),
            [necessaryIngredientsOne, setNecessaryIngredientsOne] = useState(""),
            [necessaryIngredientsTwo, setNecessaryIngredientsTwo] = useState(""),
            [necessaryIngredientsThree, setNecessaryIngredientsThree] = useState(""),
            [necessaryIngredientsFour, setNecessaryIngredientsFour] = useState(""),
            [necessaryIngredientsFive, setNecessaryIngredientsFive] = useState(""),
            [recipeCategory, setRecipeCategory] = useState(""),
            [recipeGenre, setRecipeGenre] = useState(""),
            [recipeSeason, setRecipeSeason] = useState(""),
            [cookingTime, setCookingTime] = useState(""),
            [images , setImages] = useState([]);

    const inputRecipeName = useCallback((event) => {
        setRecipeName(event.target.value)
    },[setRecipeName])

    const categories = [
        { id:"japanese" ,name:"和食" },
        { id:"chinese" ,name:"中華" },
        { id:"western" ,name:"洋食" },
        { id:"else" ,name:"その他" },
    ]

    const genres = [
        { id:"meat" ,name:"肉料理" },
        { id:"fish" ,name:"魚料理" },
        { id:"vegetables" ,name:"サラダ" },
        { id:"pasta" ,name:"パスタ" },
        { id:"rice" ,name:"ご飯もの" },
        { id:"else" ,name:"その他" },
    ]

    const cookingTimes = [
        { id:"easy" ,name:"簡単にできる" },
        { id:"normal" ,name:"普通" },
        { id:"difficult" ,name:"手間がかかる" },
    ]

    // const recipeSeasons = [
    //     { id:"spring" ,name:"春" },
    //     { id:"summer" ,name:"夏" },
    //     { id:"autumn" ,name:"秋" },
    //     { id:"winter" ,name:"冬" },
    //     { id:"all" ,name:"オールシーズン" },
    // ]

    useEffect(() => {
        console.log(id);
        if (id) {
            db.collection('users').doc(uid).collection('recipes').doc(id).get()
                .then((snapshot) => {
                    const data = snapshot.data();
                    setRecipeName(data.recipeName);
                    setNecessaryIngredientsOne(data.necessaryIngredientsOne);
                    setNecessaryIngredientsTwo(data.necessaryIngredientsTwo);
                    setNecessaryIngredientsThree(data.necessaryIngredientsThree);
                    setNecessaryIngredientsFour(data.necessaryIngredientsFour);
                    setNecessaryIngredientsFive(data.necessaryIngredientsFive);
                    setRecipeCategory(data.recipeCategory);
                    setRecipeGenre(data.recipeGenre);
                    setRecipeSeason(data.recipeSeason);
                    setCookingTime(data.cookingTime);
                    setImages(data.images);
                })
        } else {
            setRecipeName("");
            setNecessaryIngredientsOne("");
            setNecessaryIngredientsTwo("");
            setNecessaryIngredientsThree("");
            setNecessaryIngredientsFour("");
            setNecessaryIngredientsFive("");
            setRecipeCategory("");
            setRecipeGenre("");
            setRecipeSeason("");
            setCookingTime("");
            setImages([]);
        }
    }, [id])

    return(
        <section>
            <h3 className="title">レシピの登録・編集</h3>
            <div className="form-container">
                <ImageArea images={images} setImages={setImages} title={"レシピ画像の登録"}/>
                <TextInput
                    fullWidth={true} label={"レシピ名"} multiline={false} required={true}
                    rows={1} value={recipeName} type={"text"} onChange={inputRecipeName}
                />
                <SelectBox
                    label={"食材1(野菜類)"} required={true} options={vegs} select={setNecessaryIngredientsOne} value={necessaryIngredientsOne}
                />
                <SelectBox
                    label={"食材2(肉類)"} required={true} options={meats} select={setNecessaryIngredientsTwo} value={necessaryIngredientsTwo}
                />
                <SelectBox
                    label={"食材3(魚介類)"} required={true} options={fishes} select={setNecessaryIngredientsThree} value={necessaryIngredientsThree}
                />
                <SelectBox
                    label={"食材4(穀類)"} required={true} options={cereals} select={setNecessaryIngredientsFour} value={necessaryIngredientsFour}
                />
                <SelectBox
                    label={"食材5(芋・でん粉・豆・キノコ類)"} required={true} options={potatoes_starches_beans_mushrooms} select={setNecessaryIngredientsFive} value={necessaryIngredientsFive}
                />
                <SelectBox
                    label={"カテゴリー"} required={true} options={categories} select={setRecipeCategory} value={recipeCategory}
                />
                <SelectBox
                    label={"ジャンル"} required={true} options={genres} select={setRecipeGenre} value={recipeGenre}
                />
                {/* <SelectBox
                    label={"オススメの季節"} required={true} options={recipeSeasons} select={setRecipeSeason} value={recipeSeason}
                /> */}
                <SelectBox
                    autoComplete="on"
                    autoWidth={true} label={"調理時間"} required={true} options={cookingTimes} select={setCookingTime} value={cookingTime}
                />
            </div> 
            <div className="spacer-sm"/>
            <div className="center">
                <PrimaryButton
                    label={"レシピを登録"}
                    onClick={() => dispatch(saveRecipe(id, recipeName,
                        necessaryIngredientsOne, necessaryIngredientsTwo, 
                        necessaryIngredientsThree, necessaryIngredientsFour, 
                        necessaryIngredientsFive, recipeCategory, recipeGenre, 
                        cookingTime, images, uid))}
                />
            </div>
        </section>
    )
}
export default RecipeEdit