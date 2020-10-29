import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from 'connected-react-router'
import {fetchIngredientsAction} from '../ingredients/actions';
// import {saveIngredientsAction} from '../ingredients/actions';

const ingredientsRef = db.collection('ingredients');

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
export const saveIngredients = (id, ingredientsCategory, ingredients, images) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now();
        const data = {
            ingredientsCategory: ingredientsCategory,
            // ingredientsNameOne: ingredientsNameOne,
            // ingredientsNameTwo: ingredientsNameTwo,
            // ingredientsNameThree: ingredientsNameThree,
            // ingredientsNameFour: ingredientsNameFour,
            // ingredientsNameFive: ingredientsNameFive,
            ingredientsList: ingredients,
            images: images,
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
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
}
