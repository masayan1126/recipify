import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from 'connected-react-router'
import {fetchCalendarAction} from '../calendar/actions';


const recipeCalendarRef = db.collection('calendar');

// export const saveRecipe = (id, recipeName, necessaryIngredientsOne, necessaryIngredientsTwo,
//     necessaryIngredientsThree, necessaryIngredientsFour, necessaryIngredientsFive, 
//     recipeCategory, recipeGenre, recipeSeason, cookingTime, images) => {
//     return async (dispatch) => {
//         const timestamp = FirebaseTimestamp.now();
//         const data = {
//             recipeName :recipeName,
//             necessaryIngredientsOne: necessaryIngredientsOne,
//             necessaryIngredientsTwo: necessaryIngredientsTwo,
//             necessaryIngredientsThree: necessaryIngredientsThree,
//             necessaryIngredientsFour: necessaryIngredientsFour,
//             necessaryIngredientsFive: necessaryIngredientsFive,
//             recipeCategory: recipeCategory,
//             images: images,
//             recipeGenre: recipeGenre,
//             recipeSeason: recipeSeason,
//             cookingTime: cookingTime,
//             updated_at: timestamp,
//         }

//         if(id === "") {
//             const ref = recipesRef.doc();
//             id = ref.id
//             data.id = id
//             data.created_at = timestamp 
//         }

//         return recipesRef.doc(id).set(data, {merge: true})
//         .then(() => {
//             dispatch(push('/'))
//         }).catch((error) => {
//             throw new Error(error)
//         })
//     }
// }

export const saveCalendar = (id, breakfast, lunch, dinner, date, uid) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now();
        const data = {
            breakfast: breakfast,
            lunch: lunch,
            dinner: dinner,
            userId: uid,
            updated_at: timestamp,
            date: date,
        }

        // const ref = recipeCalendarRef.doc();
        // id = ref.id
        data.id = id
        data.created_at = timestamp 
        // const year = String(date).substring(0, 4);
        // const month = String(date).substring(5, 7);
        // const day = String(date).substring(8, 10);
        // date = year + month + day;
        // data.date = date;

            console.log(id);

        return recipeCalendarRef.doc(id).set(data, {merge: true})
        .then(() => {
            dispatch(push('/'))
        }).catch((error) => {
            throw new Error(error)
        })
    }
}

export const fetchCalendar = (uid) => {

    return async (dispatch) => {
        recipeCalendarRef.where('userId', '==', uid).get()
            .then(snapshots => {
                const calendar = []
                snapshots.forEach(snapshot => {
                    const recipe = snapshot.data()
                    calendar.push(recipe)
                })
                dispatch(fetchCalendarAction(calendar))
            })
    }
}