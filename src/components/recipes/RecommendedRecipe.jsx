import React,{useCallback, useState, useEffect} from 'react';
import { RecipeCard } from './index';
import { Title } from '../../templates/index';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import '../../assets/styles/style.css';
import { useDispatch, useSelector } from 'react-redux';
import {fetchRecommendedRecipe, fetchSearchRecipe} from '../../redux/recipes/operations';
import {getRecipes} from '../../redux/recipes/selecotors';
import { getUserId } from '../../redux/users/selecotors';
import { Recipe } from "./index";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const recommendedRecipeList = [
    { recipeName: "サバのトマト煮", path: "/static/images/cards/サバのトマト煮.jpg" },
    { recipeName: "ホワイトシチュー", path: "/static/images/cards/ホワイトシチュー.jpeg" },
    { recipeName: "ぶり大根", path: "/static/images/cards/ぶり大根.jpg" },
    { recipeName: "フレンチトースト", path: "/static/images/cards/フレンチトースト.jpg" },
];

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    //   justifyContent: 'center',
    //   flexDirection: 'row',
    },
    // max_width: {
    //     maxWidth: "200",
    // },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#ede9e5",
        width: '98%',
        margin: "0 auto",
        maxWidth: "500px",
        // [theme.breakpoints.up('sm')]: {
        //   marginLeft: theme.spacing(1),
        //   width: 'auto',
        // },
    },
    searchIcon: {
        padding: theme.spacing(1.5, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
      },
      inputInput: {
        padding: theme.spacing(2, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        // transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('md')]: {
        //   width: '20ch',
        // },
      },
  }));


const RecommendedRecipe = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    let recipes = getRecipes(selector);
    const uid = getUserId(selector);
    const [fade, setFade] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setFade(true);

        if (query !== "") {
            dispatch(fetchSearchRecipe(uid, query))

        } else {
            dispatch(fetchRecommendedRecipe(uid))
            
            
        }
    },[query]);

    return(
        <div>
            <h3 className="title">レシピ一覧</h3>
            <div className={classes.search}
                 
            >
                <div className={classes.searchIcon}>
                <SearchIcon/>
                </div>
                <InputBase onChange={(event) => setQuery(event.target.value)} type={"text"} value={query}
                    placeholder="Search…"
                    classes={{
                        // root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    fullWidth={true}
                />
            </div>
            <div className="spacer-sm"/>

            <CSSTransition
                in={fade}
                timeout={1000}
                classNames="fade"
            >
                <Recipe recipes={recipes} message = {"まだレシピはありません。"}
            
            // onChange={handleChange} 
                />

            </CSSTransition>
        </div>
    )
}
export default RecommendedRecipe
