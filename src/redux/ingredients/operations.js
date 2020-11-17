import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from 'connected-react-router'
import {fetchIngredientsAction, deleteIngredientsAction} from '../ingredients/actions';
import { IngredientsList } from '../../components/ingredients';

export const saveIngredients = (id, ingredientsCategory, ingredientsList, images, uid) => {
    return async (dispatch) => {
        console.log(ingredientsList);
        const ingredientsRef = db.collection('users').doc(uid).collection("ingredients")
        const timestamp = FirebaseTimestamp.now();
        const data = {
            id: id,
            images: images,
            ingredientsCategory: ingredientsCategory,
            ingredientsList: [{
                id: "",
                category: "",
                value: [],
            }],
            updated_at: timestamp,
            userId: uid,
        }

        console.log(data.ingredientsList);
        ingredientsList.forEach(ingredients => {
            data.ingredientsList[0].value.push(ingredients)
            
        })

        // const ingredientsRef = db.collection('users').doc(uid).collection('ingredients');
        // const ref = ingredientsRef.doc()
        // const id = ref.id
        // data.id = id;
        
        // if(id === "") {
        //     const ref = ingredientsRef.doc();
        //     id = ref.id
        //     data.id = id
        //     data.created_at = timestamp 
        // }
    
        
        return await ingredientsRef.doc(id).set(data, {merge: true})
        .then(() => {
            dispatch(push('/ingredients/list'))
        }).catch((error) => {
            throw new Error(error)
        })
    }
}

export const fetchIngredients = (uid) => {
    return async (dispatch) => {
        const ingredientsRef = db.collection('users').doc(uid).collection("ingredients")
        return ingredientsRef.get()
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

export const deleteIngredients = (id, uid) => {
    return async (dispatch, getState) => {
        const ingredientsRef = db.collection('users').doc(uid).collection("ingredients")
        ingredientsRef.doc(id).delete()
            .then(() => {
                const prevIngredients = getState().ingredients.list
                const nextIngredients = prevIngredients.filter(recipe => recipe.id !== id)
                dispatch(deleteIngredientsAction(nextIngredients))
                dispatch(push('/ingredients/list'))
            })
    }
}