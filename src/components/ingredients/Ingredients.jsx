import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {push} from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import Divider from '@material-ui/core/Divider';
import { deleteIngredients } from '../../redux/ingredients/operations';
import { getUserId } from '../../redux/users/selecotors';
import { cereals, meats } from '../../ingredients';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '600px;',
      backgroundColor: theme.palette.background.paper,
      margin: "0 auto",
      boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important",
      borderRadius: "10px",
    },
}));

// 食材分類一覧画面の子コンポーネント（親：IngredientsList.jsx）
const Ingredients = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);

    // useEffect(() => {

    // }, [props.ingredientsList.length])

    return (
        <>
        {props.ingredientsList.length > 0 && (
            <List className={classes.root} >
                
                
                    {props.ingredientsList.map((ingredients) => {
                        const labelId = `checkbox-list-secondary-label-${ingredients.ingredientsCategory}`;
                        return (
                            <>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`${ingredients.ingredientsCategory}`}
                                            src = { 
                                                // "/static/images/cards/no-image.jpeg"
                                                ingredients.images[0].path
                                            } 
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
                                                    dispatch(deleteIngredients(ingredients.id, uid, props.setBoolean ))
                                                }}
                                            />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <div className="spacer-xs"/>
                            </>
                        );
                    })}
            </List>
            )}
        </>
    )
}
export default Ingredients