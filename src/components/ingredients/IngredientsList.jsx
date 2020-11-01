import React,{useCallback, useState, useEffect} from 'react';
import {PrimaryButton} from "../UIkit/index";
import { useSelector,useDispatch } from 'react-redux';
import { fetchIngredients } from '../../redux/ingredients/operations';
import '../../assets/styles/style.css';
import { Ingredients } from './index';
import {getIngredients} from '../../redux/ingredients/selecotors';
import {push,} from 'connected-react-router'

// 食材分類一覧画面の子コンポーネント（親：IngredientsList.jsx）
const IngredientsList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const ingredientsList = getIngredients(selector);

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [])

  return(
      <section className="form-container">
        <h3 className="title">食材分類一覧</h3>
        <Ingredients ingredientsList={ ingredientsList } message={"まだ食材はありません。"} />
        <div className="spacer-sm"/>
        <div className="center">
          <PrimaryButton
              label={"分類を追加"}
              onClick={() => dispatch(push('/ingredients/edit'))}
          />
        </div>
      </section>
  )
}
export default IngredientsList