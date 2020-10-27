import React,{useCallback, useState, useEffect} from 'react';
import {TextInput, SelectBox, PrimaryButton} from "../UIkit/index";
import { useSelector,useDispatch } from 'react-redux';
import { saveRecipe } from '../../redux/recipes/operations';
import { fetchIngredients } from '../../redux/ingredients/operations';
import ImageArea from '../UIkit/ImageArea';
import {db, auth, FirebaseTimestamp} from '../../firebase/index';
import '../../assets/styles/style.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { SetIngredients } from "../../templates/index"
import { Ingredients } from './index';
import {getIngredients} from '../../redux/ingredients/selecotors';

const IngredientsList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const ingredientsList = getIngredients(selector);

  const useStyles = makeStyles((theme) => ({
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    }));

    useEffect(() => {
      dispatch(fetchIngredients())
  }, [])

    return(
        <section>
          {ingredientsList.length > 0 && (
            <Ingredients ingredientsList={ingredientsList} />
          )}  
        </section>
    )
}
export default IngredientsList