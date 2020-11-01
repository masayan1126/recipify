import React,{useState} from 'react';
import { searchFromIngredients } from '../../redux/recipes/operations';
import { useDispatch } from 'react-redux';
import {SelectBox, PrimaryButton} from "../UIkit/index";

// 食材からレシピを検索する画面の親コンポーネント（親：SearchIngredientsList.jsx）
const SearchIngredients = (props) => {
  const dispatch = useDispatch();

  const [veg, setVeg] = useState("未指定"),
  [meat, setMeat] = useState("未指定"),
  [fish, setFish] = useState("未指定"),
  [cereal, setCereal] = useState("未指定"),
  [others, setOthers] = useState("未指定");

  const searchRecipe = (veg, meat, fish, cereal, others) => {
    const selectedIngredients = [
      { "category": "野菜", "name": veg },
      { "category": "肉", "name": meat },
      { "category": "魚", "name": fish },
      { "category": "穀類", "name": cereal },
      { "category": "その他", "name": others },

    ]
    dispatch(searchFromIngredients(selectedIngredients))
  }

  return (
    <>
      <SelectBox
        label={"食材(野菜)"} required={true} options={props.vegs} select={setVeg} value={veg}
      />

      <SelectBox
        label={"食材(肉)"} required={true} options={props.meats} select={setMeat} value={meat}
      />   

      <SelectBox
        label={"食材(魚)"} required={true} options={props.fishes} select={setFish} value={fish}
      />  

      <SelectBox
        label={"食材(穀類)"} required={true} options={props.cereals} select={setCereal} value={cereal}
      />  

      <SelectBox
        label={"食材(芋・でん粉・豆・キノコ類)"} required={true} options={props.others} 
        select={setOthers} value={others}
      />   
          
      <div className="spacer-sm"/>
      <div className="center">
          <PrimaryButton
            label={"レシピを検索"}
            onClick={() => searchRecipe(veg, meat, fish, cereal, others)}
          />
      </div>
    </>
  );
}
export default SearchIngredients