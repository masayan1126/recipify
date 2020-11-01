import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {push} from 'connected-react-router';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import Divider from '@material-ui/core/Divider';
import { deleteIngredients } from '../../redux/ingredients/operations';

// 食材分類一覧画面の子コンポーネント（親：IngredientsList.jsx）
const Ingredients = (props) => {
    const dispatch = useDispatch();

    return (
        <>
            <p className="nothing__message">{props.ingredientsList.length < 1  ? props.message : "" }</p>
            <List className="form-container">
                {props.ingredientsList.length > 0 && (
                    props.ingredientsList.map((ingredients) => {
                        const labelId = `checkbox-list-secondary-label-${ingredients.ingredientsCategory}`;
                        return (
                            <>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`${ingredients.ingredientsCategory}`}
                                            src = { 
                                                ingredients.images.length > 0 ? 
                                                ingredients.images[0].path : "/static/images/cards/no-image.jpeg" } 
                                    />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId} primary={`${ingredients.ingredientsCategory}`} />
                                    <ListItemSecondaryAction>
                                        <IconButton> 
                                            <EditIcon 
                                                onClick={() => dispatch(push('/ingredients/edit/' + ingredients.id))}
                                                key={ingredients.id}/>
                                        </IconButton>
                                        <IconButton>
                                            <DeleteIcon
                                                onClick={() => {
                                                    dispatch(deleteIngredients(ingredients.id))
                                                }}
                                            />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        );
                    })
                )}
            </List>
        </>
    )
}
export default Ingredients