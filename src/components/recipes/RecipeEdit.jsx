import React,{ useCallback, useState, useEffect } from 'react';
import {TextInput, SelectBox, PrimaryButton} from "../UIkit/index";
import { useSelector,useDispatch } from 'react-redux';
import { saveRecipe } from '../../redux/recipes/operations';
import ImageArea from '../UIkit/ImageArea';
import { db } from '../../firebase/index';
import '../../assets/styles/style.css';
import { getUserId } from '../../redux/users/selecotors';

const RecipeEdit = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const recipesRef = db.collection('users').doc(uid).collection('recipes');
    const ingredientsRef = db.collection('users').doc(uid).collection('ingredients');

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
            [cookingTime, setCookingTime] = useState(""),
            [recipeLink, setRecipeLink] = useState(""),
            [images , setImages] = useState([]),
            [vegs, setVegs] = useState([]),
            [meats, setMeats] = useState([]),
            [fishes, setFishes] = useState([]),
            [cereals, setCereals] = useState([]),
            [others, setOthers] = useState([]);

    const inputRecipeName = useCallback((event) => {
        setRecipeName(event.target.value)
    },[setRecipeName])

    const inputRecipeLink = useCallback((event) => {
        setRecipeLink(event.target.value)
    },[setRecipeLink])

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
        { id:"noodle" ,name:"麺類" },
        { id:"rice" ,name:"ご飯もの" },
        { id:"bread" ,name:"パン類" },
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
        if (id) {
            recipesRef.doc(id).get()
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
                    setCookingTime(data.cookingTime);
                    setImages(data.images);
                    setRecipeLink(data.recipeLink);
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
            setCookingTime("");
            setImages([]);
            setRecipeLink("");
        }
    }, [id])

    useEffect(() => {
        // 肉類
        ingredientsRef.where('ingredientsCategory', '==', "肉類").get()
            .then((snapshots) => {
                snapshots.forEach(snapshot => {
                    // const data = snapshot.data();
                    console.log(snapshot.data().ingredientsList);
                    setMeats(snapshot.data().ingredientsList[0].value);
                    // setVegs(data.vegs);
                    // setFishes(data.fishes);
                    // setCereals(data.cereals);
                    // setOthers(data.others)
                })
            })

        ingredientsRef.where('ingredientsCategory', '==', "魚類").get()
            .then((snapshots) => {
                snapshots.forEach(snapshot => {
                    // const data = snapshot.data();
                    console.log(snapshot.data().ingredientsList);
                    setFishes(snapshot.data().ingredientsList[0].value);
                    // setVegs(data.vegs);
                    // setFishes(data.fishes);
                    // setCereals(data.cereals);
                    // setOthers(data.others)
                })
            })

        ingredientsRef.where('ingredientsCategory', '==', "野菜類").get()
            .then((snapshots) => {
                snapshots.forEach(snapshot => {
                    // const data = snapshot.data();
                    console.log(snapshot.data().ingredientsList);
                    setVegs(snapshot.data().ingredientsList[0].value);
                    // setVegs(data.vegs);
                    // setFishes(data.fishes);
                    // setCereals(data.cereals);
                    // setOthers(data.others)
                })
            })

        ingredientsRef.where('ingredientsCategory', '==', "穀類").get()
            .then((snapshots) => {
                snapshots.forEach(snapshot => {
                    // const data = snapshot.data();
                    console.log(snapshot.data().ingredientsList);
                    setCereals(snapshot.data().ingredientsList[0].value);
                    // setVegs(data.vegs);
                    // setFishes(data.fishes);
                    // setCereals(data.cereals);
                    // setOthers(data.others)
                })
            })

        ingredientsRef.where('ingredientsCategory', '==', "その他").get()
            .then((snapshots) => {
                snapshots.forEach(snapshot => {
                    // const data = snapshot.data();
                    console.log(snapshot.data().ingredientsList);
                    setOthers(snapshot.data().ingredientsList[0].value);
                    // setVegs(data.vegs);
                    // setFishes(data.fishes);
                    // setCereals(data.cereals);
                    // setOthers(data.others)
                })
            })

    }, [])


    return(
        <section className="fadein__bottom__fast">
            <div className="form-container">
                <h3 className="title">レシピの登録・編集</h3>
                <div className="spacer-xs"/>
                <ImageArea images={images} setImages={setImages} title={"レシピ画像の登録"}/>
                <TextInput
                    fullWidth={true} label={"レシピ名"} multiline={false} required={true}
                    rows={1} value={recipeName} type={"text"} onChange={inputRecipeName}
                />
                <div className="spacer-xs"/>
                <details>
                <summary>食材</summary>
                <SelectBox
                    label={"食材1(野菜類)"} options={vegs}
                    select={setNecessaryIngredientsOne} value={necessaryIngredientsOne}
                />
                <SelectBox
                    label={"食材2(肉類)"} options={meats}
                    select={setNecessaryIngredientsTwo} value={necessaryIngredientsTwo}
                />
                <SelectBox
                    label={"食材3(魚介類)"} options={fishes} 
                    select={setNecessaryIngredientsThree} value={necessaryIngredientsThree}
                />
                <SelectBox
                    label={"食材4(穀類)"} options={cereals} 
                    select={setNecessaryIngredientsFour} value={necessaryIngredientsFour}
                />
                <SelectBox
                    label={"食材5(芋・でん粉・豆・キノコ類)"} select={setNecessaryIngredientsFive}
                    options={others}  value={necessaryIngredientsFive}
                />
                </details>
                <div className="spacer-xs"/>
                <details>
                <summary>補足情報</summary>
                <SelectBox
                    label={"カテゴリー"} options={categories} 
                    select={setRecipeCategory} value={recipeCategory}
                />
                <SelectBox
                    label={"ジャンル"} options={genres} 
                    select={setRecipeGenre} value={recipeGenre}
                />
                <SelectBox
                    label={"調理時間"} options={cookingTimes} 
                    select={setCookingTime} value={cookingTime}
                />
                <TextInput
                    fullWidth={true} label={"レシピURL"} multiline={true} required={false}
                    rows={2} value={recipeLink} type={"text"} onChange={inputRecipeLink}
                />
                </details>
                <div className="spacer-sm"/>
                <div className="center">
                    <PrimaryButton
                        label={"レシピを登録"}
                        onClick={() => dispatch(saveRecipe(id, recipeName,
                            necessaryIngredientsOne, necessaryIngredientsTwo, 
                            necessaryIngredientsThree, necessaryIngredientsFour, 
                            necessaryIngredientsFive, recipeCategory, recipeGenre, 
                            cookingTime, images, uid, recipeLink))}
                    />
                </div>
                <div className="spacer-sm"/>
            </div> 
            <div className="spacer-sm"/>
        </section>
    )
}
export default RecipeEdit