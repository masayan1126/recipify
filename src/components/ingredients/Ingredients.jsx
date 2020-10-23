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

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
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
            <ListItem onClick={() => routeIngredientsDetails(ingredients.id)} key={ingredients.ingredientsCategory} button>
                <ListItemAvatar>
                <Avatar
                    alt={`Avatar n°${ingredients.ingredientsCategory}`}
                    src={`/static/images/avatar/${ingredients.ingredientsCategory + 1}.jpg`}
                />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${ingredients.ingredientsCategory}`} />
                <ListItemSecondaryAction>
                <Checkbox
                    edge="end"
                    onChange={handleToggle(ingredients.ingredientsCategory)}
                    checked={checked.indexOf(ingredients.ingredientsCategory) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
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