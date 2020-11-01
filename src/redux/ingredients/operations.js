import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from 'connected-react-router'
import {fetchIngredientsAction, deleteIngredientsAction} from '../ingredients/actions';

const ingredientsRef = db.collection('ingredients');

export const saveIngredients = (id, ingredientsCategory, ingredients, images) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now();
        const data = {
            ingredientsCategory: ingredientsCategory,
            images: images,
            ingredientsList: ingredients,
            updated_at: timestamp,
        }
        
        if(id === "") {
            const ref = ingredientsRef.doc();
            id = ref.id
            data.id = id
            data.created_at = timestamp 
        }
        
        return ingredientsRef.doc(id).set(data, {merge: true})
        .then(() => {
            dispatch(push('/ingredients/list'))
        }).catch((error) => {
            throw new Error(error)
        })
    }
}

export const fetchIngredients = () => {
    return async (dispatch) => {
        ingredientsRef.get()
            .then(snapshots => {
                const ingredientsList = []
                snapshots.forEach(snapshot => {
                    const ingredients = snapshot.data()
                    ingredientsList.push(ingredients)
                })
                dispatch(fetchIngredientsAction(ingredientsList))
            })
    }
}

export const deleteIngredients = (id) => {
    return async (dispatch, getState) => {
        ingredientsRef.doc(id).delete()
            .then(() => {
                const prevIngredients = getState().ingredients.list
                const nextIngredients = prevIngredients.filter(recipe => recipe.id !== id)
                dispatch(deleteIngredientsAction(nextIngredients))
            })
    }
}