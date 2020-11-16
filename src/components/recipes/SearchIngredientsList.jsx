import React,{useCallback, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { SearchIngredients} from './index';
import { fetchIngredients } from "../../redux/ingredients/operations";
// import { 
//     vegs, meats, fishes, cereals, potatoes_starches_beans_mushrooms 
// } from '../../ingredients';
import { db } from '../../firebase';
import { getUserId } from '../../redux/users/selecotors';
import { getIngredients } from '../../redux/ingredients/selecotors';

// 食材からレシピを検索する画面の親コンポーネント（子：SearchIngredients.jsx）
const SearchIngredientsList = () => {
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    // const ingredientsList = getIngredients(selector);
    const [vegs, setVegs] = useState([]),
    [meats, setMeats] = useState([]),
    [fishes, setFishes] = useState([]),
    [cereals, setCereals] = useState([]),
    [others, setOthers] = useState([]);
    const ingredientsList = []

    useEffect(() => {
        // fetchIngredients(uid);
        (async() => {
            
            await db.collection('users').doc(uid).collection("ingredients").get()
                .then(snapshots => {
                    snapshots.forEach(doc => {
                        const data = doc.data();
                        ingredientsList.push(data.ingredientsList[0].value);
                    })
                    console.log(ingredientsList);
                    setCereals(ingredientsList[0]);
                    setFishes(ingredientsList[1]);
                    setMeats(ingredientsList[2]);
                    setOthers(ingredientsList[3]);
                    setVegs(ingredientsList[4]);
            });
        })();
    }, []);

    return(
        <section className="form-container">
            <SearchIngredients
                vegs={vegs} 
                meats={meats} fishes={fishes}
                cereals={cereals} others={others}
            />
        </section>
    )
}
export default SearchIngredientsList