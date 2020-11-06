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

export const autoSaveCalendar = (uid, startYear, startMonth, startDay, endDay, recipeNameList) => {
    return async (dispatch) => {
        if (Number(startDay) > Number(endDay)) {
            alert("終了日は開始日よりも後の日付を入力してください");
            return
        }
        
        // recipeNameListの中身をランダムに入れ替える
        for　(let i = recipeNameList.length - 1; i > 0; i--){
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = recipeNameList[i];
            recipeNameList[i] = recipeNameList[r];
            recipeNameList[r] = tmp;
        }
        
        if (startMonth.length == 1) {
            startMonth = `0${startMonth}`
        }

        if (startDay.length == 1) {
            startDay = `0${startDay}`
        }

        if (endDay.length == 1) {
            endDay = `0${endDay}`
        }

        const start = Number(startYear + startMonth + startDay)
        const end = Number(startYear + startMonth + endDay)
        const difference = end - start;
        let date = start;
        const timestamp = FirebaseTimestamp.now();

        for (let i = 0; i <= difference; i += 1) {

            const data = {
                dinner: recipeNameList[i],
                userId: uid,
                updated_at: timestamp,
                date: `${date + i}`, 
                id: `${date + i}`,
                dateId: `${date + i}`,
            }
    
            const calendarRef = db.collection("users").doc(uid).collection('calendar');
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

// data(dinner, uid, date, dateId, id, breakfast, lunch)
export const addCalendar = (data) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now();
        const calendarRef = db.collection("users").doc(data.userId).collection('calendar');
        const registeredCalendarDataArray = []
        await calendarRef.get()
            .then(snapshots =>{
                snapshots.forEach(snapshot => {
                    const data = snapshot.data()
                    registeredCalendarDataArray.push(data)
                    
                });
            })

        // 登録済みカレンダーデータのidの配列
        const registeredCalendarIdArray = registeredCalendarDataArray.map(registeredCalendarData =>
            registeredCalendarData.dateId)
        let modified = null

        // 新規登録 or 編集 のチェック
        if (registeredCalendarIdArray.includes(data.dateId)) {
            modified = true
        } else {
            modified = false
        }

        console.log(modified);
        data.updated_at = timestamp;
        // 新規登録の場合
        if(modified === false) {
            data.id = data.dateId
            data.created_at = timestamp 
        } 
        await calendarRef.doc(data.dateId).set(data, {merge: true}) 
        dispatch(push('/'));
    }
}