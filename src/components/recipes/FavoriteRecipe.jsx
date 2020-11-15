import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch } from 'react-redux';
import {push} from 'connected-react-router'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '600px;',
      backgroundColor: theme.palette.background.paper,
      margin: "0 auto",
      boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important"
    },
  }));

const FavoriteRecipe = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return(
        <>
            <List className={classes.root}>
                { props.favoriteRecipes.length > 0 && (
                    props.favoriteRecipes.map(favoriteRecipe => (
                        <>
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
                                            ジャンル：{favoriteRecipe.recipeGenre}<br/>
                                            カテゴリー：{favoriteRecipe.recipeCategory}<br/>
                                            調理時間：{favoriteRecipe.cookingTime}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <div className="spacer-sm"/>
                        </>
                    ))
                )}
            </List>
        </>
    )
}
export default FavoriteRecipe