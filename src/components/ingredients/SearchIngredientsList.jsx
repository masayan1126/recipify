import React from 'react';
import { useSelector } from 'react-redux';
import { SearchIngredients} from './index';
import { vegs, meats, fishes, cereals, potatoes_starches_beans_mushrooms } from '../../ingredients';

// 食材からレシピを検索する画面の親コンポーネント（子：SearchIngredients.jsx）
const SearchIngredientsList = () => {

    return(
        <section className="form-container">
            <h3 className="title">食材を複数選択してください</h3>
            <SearchIngredients 
                vegs={vegs} meats={meats} fishes={fishes} cereals={cereals}
                others={potatoes_starches_beans_mushrooms}
            />
        </section>
    )
}
export default SearchIngredientsList