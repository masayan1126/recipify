import React,{useCallback, useState, useEffect} from 'react';
import {TextInput, SelectBox, PrimaryButton} from "../UIkit/index";
import { useSelector,useDispatch } from 'react-redux';
import { saveRecipe } from '../../redux/recipes/operations';
import ImageArea from '../UIkit/ImageArea';
import {db, auth, FirebaseTimestamp} from '../../firebase/index';
import '../../assets/styles/style.css';
import { getUserId } from '../../redux/users/selecotors';
import { getIngredients } from '../../redux/ingredients/selecotors';
import { fetchIngredients } from '../../redux/ingredients/operations';
import { vegs, meats, fishes, cereals, potatoes_starches_beans_mushrooms } from '../../ingredients';

const RecipeEdit = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    let ingredientsList = []
    ingredientsList = getIngredients(selector);
    const ingredientsArr = []
    ingredientsList.forEach(element => {
        ingredientsArr.push(element.ingredients)
    });
    
    // const arr = ingredientsList.filter((item => item.ingredientsCategory === '魚類'))
    // const fishesArr = arr.map((value) => value.ingredients)
    // const fishes = fishesArr.filter((value, index) => {
    //     return index === 0
    // })

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
            [recipeGenre, setRecipeGenre] = useState("0"),
            [recipeSeason, setRecipeSeason] = useState(""),
            [cookingTime, setCookingTime] = useState(""),
            [images , setImages] = useState([]);

    const inputRecipeName = useCallback((event) => {
        setRecipeName(event.target.value)
    },[setRecipeName])

    const inputNecessaryIngredientsOne = useCallback((event) => {
        setNecessaryIngredientsOne(event.target.value)
    },[setNecessaryIngredientsOne])

    const inputNecessaryIngredientsTwo = useCallback((event) => {
        setNecessaryIngredientsTwo(event.target.value)
    },[setNecessaryIngredientsTwo])

    const inputNecessaryIngredientsThree = useCallback((event) => {
        setNecessaryIngredientsThree(event.target.value)
    },[setNecessaryIngredientsThree])

    const inputNecessaryIngredientsFour = useCallback((event) => {
        setNecessaryIngredientsFour(event.target.value)
    },[setNecessaryIngredientsFour])

    const inputNecessaryIngredientsFive = useCallback((event) => {
        setNecessaryIngredientsFive(event.target.value)
    },[setNecessaryIngredientsFive])

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

    const recipeSeasons = [
        { id:"spring" ,name:"春" },
        { id:"summer" ,name:"夏" },
        { id:"autumn" ,name:"秋" },
        { id:"winter" ,name:"冬" },
        { id:"all" ,name:"オールシーズン" },
    ]

    useEffect(() => {
        
        dispatch(fetchIngredients())
        if (id !== "") {
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
        }
    }, [])

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
                {/* <TextInput 
                    fullWidth={true} label={"必要食材1"} multiline={false} required={true}
                    rows={1} value={necessaryIngredientsOne} type={"text"} onChange={inputNecessaryIngredientsOne}
                />
                <TextInput 
                    fullWidth={true} label={"必要食材2"} multiline={false} required={true}
                    rows={1} value={necessaryIngredientsTwo} type={"text"} onChange={inputNecessaryIngredientsTwo}
                />
                <TextInput 
                    fullWidth={true} label={"必要食材3"} multiline={false} required={true}
                    rows={1} value={necessaryIngredientsThree} type={"text"} onChange={inputNecessaryIngredientsThree}
                />
                <TextInput 
                    fullWidth={true} label={"必要食材4"} multiline={false} required={true}
                    rows={1} value={necessaryIngredientsFour} type={"text"} onChange={inputNecessaryIngredientsFour}
                />
                <TextInput 
                    fullWidth={true} label={"必要食材5"} multiline={false} required={true}
                    rows={1} value={necessaryIngredientsFive} type={"text"} onChange={inputNecessaryIngredientsFive}
                /> */}
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
                    label={"調理時間"} required={true} options={cookingTimes} select={setCookingTime} value={cookingTime}
                />
                <div className="spacer-sm"/>
                <div className="center">
                    <PrimaryButton
                        label={"レシピを登録"}
                        onClick={() => dispatch(saveRecipe(id,recipeName, necessaryIngredientsOne, necessaryIngredientsTwo, 
                            necessaryIngredientsThree, necessaryIngredientsFour, necessaryIngredientsFive, 
                            recipeCategory, recipeGenre, recipeSeason, cookingTime, images, uid))}
                    />
                </div>
           </div> 
        </section>
    )
}
export default RecipeEdit