import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from 'connected-react-router'
import { 
    fetchRecommendedRecipeAction,deleteRecommendedRecipeAction,
    fetchCalendarAction, fetchSearchRecipeAction, searchFromIngredientsAction
} from '../recipes/actions';

export const saveRecipe = (id, recipeName, necessaryIngredientsOne, necessaryIngredientsTwo,
    necessaryIngredientsThree, necessaryIngredientsFour, necessaryIngredientsFive, 
    recipeCategory, recipeGenre, cookingTime, images, uid, recipeLink) => {
    return async (dispatch) => {

        if (!recipeName || images.length == 0) {
            alert("レシピ名とレシピ画像は必須です");
            return;
        }

        const recipesRef = db.collection('users').doc(uid).collection('recipes');
        const timestamp = FirebaseTimestamp.now();
        const data = {
            recipeName :recipeName,
            necessaryIngredientsOne: necessaryIngredientsOne,
            necessaryIngredientsTwo: necessaryIngredientsTwo,
            necessaryIngredientsThree: necessaryIngredientsThree,
            necessaryIngredientsFour: necessaryIngredientsFour,
            necessaryIngredientsFive: necessaryIngredientsFive,
            recipeCategory: recipeCategory,
            recipeGenre: recipeGenre,
            cookingTime: cookingTime,
            images: images,
            userId: uid,
            updated_at: timestamp,
            favorite: false,
            recipeLink: recipeLink,
        }

        if(id === "") {
            const ref = recipesRef.doc();
            id = ref.id
            data.id = id
            data.created_at = timestamp 
        }

        return recipesRef.doc(id).set(data, {merge: true})
        .then(() => {
            dispatch(push('/'))
        }).catch((error) => {
            throw new Error(error)
        })
    }
}

export const fetchRecommendedRecipe = (uid) => {
    return async (dispatch) => {
        const recipesRef = db.collection('users').doc(uid).collection('recipes');
        recipesRef.get()
            .then(snapshots => {
                const recommendedRecipeList = []
                snapshots.forEach(snapshot => {
                    const recipe = snapshot.data()
                    recommendedRecipeList.push(recipe)
                })
                dispatch(fetchRecommendedRecipeAction(recommendedRecipeList))
            })
    }
}

export const fetchSearchRecipe = (uid, query) => {
    return async (dispatch) => {
        const recipesRef = db.collection('users').doc(uid).collection('recipes');
        recipesRef.get()
            .then(snapshots => {
                const searchRecipeList = []
                snapshots.forEach(snapshot => {
                    const recipe = snapshot.data()
                    if(recipe.recipeName.indexOf(query) === 0){
                        // 前方一致のときの処理
                        searchRecipeList.push(recipe)
                    }
                })
                dispatch(fetchSearchRecipeAction(searchRecipeList))
            })
    }
}



export const deleteRecipe = (id, uid) => {
    return async (dispatch, getState) => {
        const recipesRef = db.collection('users').doc(uid).collection('recipes');
        recipesRef.doc(id).delete()
            .then(() => {
                const prevRecipes = getState().recipes.list
                const nextRecipes = prevRecipes.filter(recipe => recipe.id !== id)
                dispatch(deleteRecommendedRecipeAction(nextRecipes))
            })
    }
}

export const searchFromIngredients = (selectedIngredients) => {
    return async (dispatch) => {
        dispatch(searchFromIngredientsAction(selectedIngredients))
        dispatch(push("/recipe/search/ingredients/result"))
        
    }
}