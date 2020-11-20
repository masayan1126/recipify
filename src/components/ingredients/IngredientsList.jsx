import React,{useCallback, useState, useEffect} from 'react';
import {PrimaryButton} from "../UIkit/index";
import { useSelector,useDispatch } from 'react-redux';
import { fetchIngredients } from '../../redux/ingredients/operations';
import '../../assets/styles/style.css';
import { Ingredients } from './index';
import {getIngredients} from '../../redux/ingredients/selecotors';
import {push,} from 'connected-react-router'
import {db} from '../../firebase/index';
import { getUserId } from '../../redux/users/selecotors';

// 食材分類一覧画面の親コンポーネント
const IngredientsList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  // const ingredientsList = [];
  const uid = getUserId(selector);
  // const ingredientsList = getIngredients(selector);
  const usersRef = db.collection("users");
  
  const [ingredientsList, setIngredientsList] = useState([]),
        [boolean, setBoolean] = useState(false);
  // const [ingredientsList, setIngredientsList] = useState([]);
  // [meats, setMeats] = useState([]),
  // [fishes, setFishes] = useState([]),
  // [cereals, setCereals] = useState([]),
  // [others, setOthers] = useState([]);

  useEffect(() => {
    const ingredientsRef = usersRef.doc(uid).collection("ingredients")
    console.log(ingredientsList.length);
    const arr = []
    // dispatch(fetchIngredients(uid))
    ingredientsRef.get()
      .then((snapshots) => {
          snapshots.forEach(snapshot => {
            const data = snapshot.data()
            arr.push(data);
          })
      setIngredientsList(arr);
    })
  }, [boolean])

  console.log(ingredientsList.length);

  return(
      <section className="form-container">
        <div className="spacer-sm"/>
        <h3 className="title">食材分類一覧</h3>

        <>
          <Ingredients 
            // vegs={vegs} meats={meats} fishes={fishes}
            // cereals={cereals} others={others}
              ingredientsList={ingredientsList}
              message={"まだ食材はありません。"} 
              setBoolean={setBoolean}
            />
          <div className="spacer-sm"/>
          <div className="center">
            <PrimaryButton
                label={"分類を追加"}
                onClick={() => dispatch(push('/ingredients/edit'))}
            />
          </div>
        </>
        <div className="spacer-sm"/>
      </section>
  )
}
export default IngredientsList