import React,{useCallback, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchRecommendedRecipe} from '../../../redux/recipes/operations';
import {getBotResult} from '../../../redux/bot/selecotors';
import {getRecipes} from '../../../redux/recipes/selecotors';
import { getUserId } from '../../../redux/users/selecotors';
import { Recipes } from "../index";
import { CSSTransition } from 'react-transition-group';
import { NoData } from "../../../templates/index";
import {push} from 'connected-react-router'


const AiRecommendedRecipe = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const recipes = getRecipes(selector);
    const [fade, setFade] = useState(false);
          
    const botResult = getBotResult(selector);
    const aiRecipes = [];

    if (botResult.length > 1) {
        // 1つ目の回答（和食等）
        const answerOne = botResult[0].answer
        // ２つ目の回答（肉料理等）
        const answerTwo = botResult[1].answer
        // ３つ目の回答（調理時間）
        let answerThree = botResult[2].answer

        switch (answerThree) {
            case "あまり時間がない":
                answerThree = "簡単にできる"
                break;
            case "普通":
                answerThree = "普通"
                break;
            case "かなり時間がある":
                answerThree = "手間がかかる"
                break;
        } 
    
        //　登録済みレシピのうち、選択した回答の条件と一致するレシピを抽出
        const recipeList = recipes.filter((recipe) => {
            return recipe.recipeCategory == answerOne
            &&  recipe.recipeGenre == answerTwo
            &&  recipe.cookingTime == answerThree
        })

        recipeList.forEach(recipe => {
            aiRecipes.push(recipe)
        });
    } else {
        dispatch(push("/recipe/bot"))
    }

    console.log(aiRecipes);
    const message = "該当するレシピはありませんでした"

    useEffect(() => {
        dispatch(fetchRecommendedRecipe(uid))
        setFade(true);
    },[]);

    return(
        <section>
            { aiRecipes.length == 0 ?
                <NoData
                    message={"該当するレシピはありませんでした!!"}
                    linkMenu={"＞もう一度チャットする"}
                    onClick={() => dispatch(push("/recipe/bot"))}
                />
                :
                <Recipes 
                    recipes={aiRecipes}
                />
            }      
        </section>
    )
}
export default AiRecommendedRecipe
