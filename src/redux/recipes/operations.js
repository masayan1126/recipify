import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from 'connected-react-router'
import { 
    fetchRecommendedRecipeAction,deleteRecommendedRecipeAction,
    fetchCalendarAction, fetchSearchRecipeAction, searchFromIngredientsAction
} from '../recipes/actions';

const recipeCalendarRef = db.collection('calendar');

export const saveRecipe = (id, recipeName, necessaryIngredientsOne, necessaryIngredientsTwo,
    necessaryIngredientsThree, necessaryIngredientsFour, necessaryIngredientsFive, 
    recipeCategory, recipeGenre, recipeSeason, cookingTime, images, uid) => {
    return async (dispatch) => {
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
            images: images,
            recipeGenre: recipeGenre,
            recipeSeason: recipeSeason,
            cookingTime: cookingTime,
            userId: uid,
            updated_at: timestamp,
            favorite: false,
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

export const saveCalendar = (id, breakfast, lunch, dinner, date) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now();
        const data = {
            breakfast: breakfast,
            lunch: lunch,
            dinner: dinner,
            updated_at: timestamp,
            date: date,
        }

        const ref = recipeCalendarRef.doc();
        id = ref.id
        data.id = id
        data.created_at = timestamp 
        const year = String(date).substring(0, 4);
        const month = String(date).substring(5, 7);
        const day = String(date).substring(8, 10);
        date = year + month + day;
        data.date = date;

        return recipeCalendarRef.doc(date).set(data, {merge: true})
        .then(() => {
            dispatch(push('/'))
        }).catch((error) => {
            throw new Error(error)
        })
    }
}

export const searchFromIngredients = (selectedIngredients) => {
    return async (dispatch) => {
        dispatch(searchFromIngredientsAction(selectedIngredients))
        dispatch(push("/recipe/search/ingredients/result"))
        
    }
}