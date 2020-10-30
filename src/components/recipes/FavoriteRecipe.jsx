import React,{useCallback, useState, useEffect} from 'react';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useSelector,useDispatch } from 'react-redux';
import {push, goBack} from 'connected-react-router'


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

const FavoriteRecipe = (props) => {
    const classes = useStyles();
    console.log(props.favoriteRecipes);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     setFade(true);
    
    // }, [])

    return(
        <>
            <List className={classes.root}>
            { props.favoriteRecipes.length > 0 && (
                props.favoriteRecipes.map(favoriteRecipe => (
                <>
                {/* /recipe/0VP5MZxVs8KjYDm6tjtM */}
                <ListItem alignItems="flex-start"
                    onClick={() => dispatch(push(`/recipe/detail/${favoriteRecipe.id}`))} 
                >
                    <ListItemAvatar>
                    <Avatar alt="" src={favoriteRecipe.images[0].path} />
                    </ListItemAvatar>
                    <ListItemText
                    primary={favoriteRecipe.recipeName}
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                
                </>
            ))
            )}
            </List>
        </>
    )
}
export default FavoriteRecipe