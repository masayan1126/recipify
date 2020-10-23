import React,{useCallback, useState, useEffect} from 'react';
import { Ingredients } from "../index";
import {db, auth, FirebaseTimestamp} from '../../firebase/index';
import {fetchIngredients} from '../../redux/ingredients/operations';
import { useDispatch, useSelector } from 'react-redux';
import {getIngredients} from '../../redux/ingredients/selecotors';
import {TextInput, SelectBox, PrimaryButton} from "../UIkit/index";
import { saveIngredients } from '../../redux/ingredients/operations';
import { SetIngredients } from "../recipes/index";

const IngredientsDetails = (props) => {
    

    return(
        <div>
            <h2>食材詳細</h2>
            
        </div>
    )
}
export default IngredientsDetails