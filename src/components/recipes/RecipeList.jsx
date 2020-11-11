import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../../assets/styles/style.css';
import { useDispatch, useSelector } from 'react-redux';
import {fetchRecommendedRecipe, fetchSearchRecipe} from '../../redux/recipes/operations';
import {getRecipes} from '../../redux/recipes/selecotors';
import { getUserId } from '../../redux/users/selecotors';
import { Recipes } from "./index";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    // root: {
    //   flexGrow: 1,
    // },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#ede9e5",
        width: '100%',
        margin: "0 auto",
        maxWidth: "530px",
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
        padding: theme.spacing(2, 1, 1.5, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
    },
}));

const RecipeList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const recipes = getRecipes(selector);
    const uid = getUserId(selector);
    const [fade, setFade] = useState(false),
          [show, setShow] = useState(true),
          [query, setQuery] = useState("");

    useEffect(() => {
        setFade(true);

        // 検索フォームが空でなければ、検索条件に一致するデータを取得する
        if (query !== "") {
            dispatch(fetchSearchRecipe(uid, query))

        // 検索フォームが空であれば、全てのデータを取得する
        } else {
            dispatch(fetchRecommendedRecipe(uid))
        }
    },[query]);　

    return(
        <section>
            <h3 className="title">レシピ一覧</h3>
            
            {(show) ? 
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase 
                    onChange={(event) => setQuery(event.target.value)}
                    type={"text"} value={query}
                    placeholder="検索条件を入力してください"
                    classes={{
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    fullWidth={true}
                    autoFocus = {true}
                />
            </div>
            : ""}
            <div className="spacer-xs"/>
            {/* <CSSTransition
                in={fade}
                timeout={1000}
                classNames="fade"
            > */}
                    <Recipes recipes={recipes} 
                    message = {"まだレシピはありません。"}
                    show={show}
                    setShow={setShow}
                />
            {/* </CSSTransition> */}
        </section>
    )
}
export default RecipeList
