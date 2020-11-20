import React,{useCallback, useState, useEffect} from 'react';
import { searchFromIngredients } from '../../redux/recipes/operations';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {SelectBox, PrimaryButton} from "../UIkit/index";
import { getUserId } from '../../redux/users/selecotors';
import Loading from "../../Loading";

// 食材からレシピを検索する画面の子コンポーネント（親：SearchIngredientsList.jsx）
const SearchIngredients = (props) => {
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const dispatch = useDispatch();
  const [veg, setVeg] = useState("未指定"),
  [meat, setMeat] = useState("未指定"),
  [fish, setFish] = useState("未指定"),
  [cereal, setCereal] = useState("未指定"),
  [other, setOther] = useState("未指定"),
  [loading, setLoading] = useState(false);

  const searchRecipe = (veg, meat, fish, cereal, other) => {
    const selectedIngredients = [
      { "category": "野菜", "name": veg },
      { "category": "肉", "name": meat },
      { "category": "魚", "name": fish },
      { "category": "穀類", "name": cereal },
      { "category": "その他", "name": other },

    ]
    setLoading(true);
    setTimeout(() => {
      dispatch(searchFromIngredients(selectedIngredients))
      setLoading(false);
    }, 3500);
  }

  return (
    <>
    { loading == true ? <Loading /> :
      <>
      <h3 className="title">食材からレシピ検索</h3>
      {(!props.vegs && !props.meats && !props.fishes && !props.cereals && !props.others) ?
        <h4>献立に必要な食材分類が１つもありません。</h4>
      :
      <>
      <div className="spacer-sm"/>
       {(props.vegs) ?
        <SelectBox
          label={"食材(野菜)"} 
          required={true} options={props.vegs} 
          select={setVeg} value={veg}
          // variant="filled"
          />
        :""
      }

    {(props.meats) ?
      <SelectBox
        label={"食材(肉)"} required={true} options={props.meats} 
        select={setMeat} value={meat}
        // variant="filled"
      />
      :""
    }
    
    {(props.fishes) ?
      <SelectBox
        label={"食材(魚)"} required={true} options={props.fishes} 
        select={setFish} value={fish}
        // variant="filled"
      />
      :""
    }

    {(props.cereals) ?
      <SelectBox
        label={"食材(穀類)"} required={true} 
        options={props.cereals} 
        select={setCereal} value={cereal}
        // variant="filled"
      />
      :""
    }

    {(props.others) ?
      <SelectBox
        label={"食材(芋・でん粉・豆・キノコ類)"} required={true} 
        options={props.others} 
        // variant="filled"
        select={setOther} value={other}
      />
      :""
    }      

      <div className="spacer-sm"/>
      <div className="center">
          <PrimaryButton
            label={"レシピを検索"}
            onClick={() => searchRecipe(veg, meat, fish, cereal, other)}
          />
      </div>
      <div className="spacer-sm"/> 
    </>
    }
    </>
    }
    </>
  );
}
export default SearchIngredients