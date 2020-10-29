import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import {push} from 'connected-react-router';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
  }));

const Ingredients = (props) => {
    const dispatch = useDispatch();

    const routeIngredientsDetails = (id) => {
        dispatch(push('/ingredients/edit/' + id))
    }

    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return(
        <>
            <List dense className={classes.root}>
            {props.ingredientsList.map((ingredients) => {
            const labelId = `checkbox-list-secondary-label-${ingredients.ingredientsCategory}`;
            return (
            <ListItem>
                <ListItemAvatar>
                <Avatar
                    alt={`${ingredients.ingredientsCategory}`}
                    src={ingredients.images[0].path}
                />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${ingredients.ingredientsCategory}`} />
                <ListItemSecondaryAction>
                    <IconButton className={classes.iconCell}> 
                        <EditIcon onClick={() => routeIngredientsDetails(ingredients.id)} key={ingredients.ingredientsCategory} button/>
                    </IconButton>
                    <IconButton className={classes.iconCell} 
                        // onClick={() => deleteIngredients(i)}
                    >
                        <DeleteIcon/>
                    </IconButton>
                    
                </ListItemSecondaryAction>
            </ListItem>
        );
      })}
    </List>

        </>
        // {props.options.map((value) => {
        //     return <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
        // })}
    )
}
export default Ingredients