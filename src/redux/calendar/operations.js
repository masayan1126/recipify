import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from 'connected-react-router'
import {fetchCalendarAction} from '../calendar/actions';
import { getUserId } from '../users/selecotors';

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



        return recipeCalendarRef.doc(uid + id).set(data, {merge: true})
        .then(() => {
            dispatch(push('/'))
        }).catch((error) => {
            throw new Error(error)
        })
    }
}

export const autoSaveCalendar = (uid, id, startYear, startMonth, startDay, endDay, recipeNameList) => {
    return async (dispatch) => {
        
        const start = Number(startYear + startMonth + startDay) 
        const end = Number(startYear + startMonth +endDay)
        const difference = end - start;
        for(let i = recipeNameList.length - 1; i > 0; i--){
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = recipeNameList[i];
            recipeNameList[i] = recipeNameList[r];
            recipeNameList[r] = tmp;
        }

        // const year = String(date).substring(0, 4);
        // const month = String(date).substring(5, 7);
        // const day = String(date).substring(8, 10);
        // date = year + month + day;
        // data.date = date;

        const timestamp = FirebaseTimestamp.now();
        let date = start;

        for (let i = 0; i <= difference; i += 1) {

            const data = {
                dinner: recipeNameList[i],
                userId: uid,
                updated_at: timestamp,
                date: `${date + i}`, 
                id: `${date + i}`,
                dateId: `${date + i}`,

                // update: false,
                // breakfast: ,
                // lunch: lunch,
                // dinner: dinner,
                // userId: uid,
                // date: date,
                // dateId: dateId,
                // id: id, 
            }
    
            const calendarRef = db.collection("users").doc(uid).collection('calendar');
            // data.id = autoMaketTargetDates
            // data.created_at = timestamp calendarRef.doc(id).set(data, {merge: true})
            calendarRef.doc(`${start + i}` ).set(data, {merge: true})
            .then(() => {
                console.log('処理成功');
            }).catch((error) => {
                throw new Error(error)
            })
        }
        dispatch(push('/recipe/calendar'))
    }
}

export const fetchCalendar = (uid) => {

    return async (dispatch) => {
        const calendarRef = db.collection("users").doc(uid).collection('calendar');
        calendarRef.get()
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

export const addCalendar = (data) => {

    return async (dispatch, getState) => {

        const uid = getState().users.uid
        const timestamp = FirebaseTimestamp.now();
        data.timestamp = timestamp;
        const calendarRef = db.collection("users").doc(uid).collection('calendar');
        let id = data.id;
        // 新規登録の場合
        console.log(id);
        if(id == "") {
            // const ref = calendarRef.doc();
            // const newCalendarId = ref.id
            data.id = id
            data.created_at = timestamp 
            data.dateId = id
            // data['calendarId'] = id;
            // id = calendarId
            console.log('新規登録です');
            // if(!calendarRef.where('dateId', '==', data.dateId).get()) {
        } 
        await calendarRef.doc(id).set(data, {merge: true}) 
             

        // data.id = calendarRef.id;
        dispatch(push('/'));

        // recipeCalendarRef.where('userId', '==', uid).get()
        //     .then(snapshots => {
        //         const calendar = []
        //         snapshots.forEach(snapshot => {
        //             const recipe = snapshot.data()
        //             calendar.push(recipe)
        //         })
        //         dispatch(fetchCalendarAction(calendar))
        //     })
    }
}