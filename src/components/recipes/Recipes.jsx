import React,{ useState, useEffect } from 'react';
import Pagination from "material-ui-flat-pagination";
import { RecipeCard } from './index';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import {goBack} from 'connected-react-router'
import {FlashMessage} from "../../templates/index";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  recipesContainer: {
    maxWidth: "1000px",
    margin: "0 auto"
  },
  
}));

const Recipes = (props) => {
  const classes = useStyles();
  console.log(props.recipes);
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0),
        [parPage, setParPage] = useState(18);

  const handleClickPagination = offset => {
    if (offset > 0) {
      props.setShow(false)
    } else {
      props.setShow(true)
    }
    console.log(offset);
    setOffset(offset)
    window.scrollTo(0, 0)

  }
  
  return (
    <div className={classes.recipesContainer}>
    
      {/* <FlashMessage /> */}
      {props.recipes.length < 1  ?
        <>
          <div className="spacer-lg"/>
          <div className="spacer-lg"/>
          <p className="nothing__message">{props.message}</p>
          <div className="center">
            <p className="p-link-menu"
              onClick={() => dispatch(goBack())}>＞ 前の画面に戻る
            </p>
          </div>
        </>
      : ""
      }
      <Grid container spacing={1}>
          {props.recipes.length > 0 && (
            props.recipes.slice(offset, offset + parPage)
              .map(recipe => (
                  <Grid 
                    item className={classes.card} xs={6} sm={4} md={3} lg={2}
                    className="fadein__bottom__fast"
                  >
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  </Grid>
              ))
          )}   
      </Grid>

      <div className="spacer-md"/>
      <Pagination className="text-center"
        limit={parPage}
        // 選択しているページ
        offset={offset}
        total={props.recipes.length}
        onClick={(e, offset) => handleClickPagination(offset)}
      />
      <div className="spacer-md"/>
    </div>
  );
}

export default Recipes