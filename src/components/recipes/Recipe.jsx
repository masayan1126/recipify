import React,{useCallback, useState, useEffect} from 'react';
import Pagination from "material-ui-flat-pagination";
import { RecipeCard } from '../recipes/index';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import {push} from 'connected-react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  },
  height :{
    height: "100vh",
    minHeight: "100vh",
  },
  max_width: {
      maxWidth: "200",
  },
  // fixBottom : {
  //   position:"fixed",
  //   bottom: 120,
  //   left:115,
  // }
}));  


const Recipe = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0),
        [parPage, setParPage] = useState(4);

  const handleClickPagination = offset => {
    setOffset(offset)
  }
  
  return (
    <div className={classes.root}>
      <h3 className="title">レシピ一覧</h3>
      <p className="nothing__message">{props.recipes.length < 1  ? props.message : "" }</p>
      {props.recipes.length < 1  ?  
        <div className="center">
          <p className="p-link-menu" onClick={() => dispatch(push("/"))}>＞ トップ画面に戻る</p>
        </div>
        : ""
      }
      <Grid container spacing={2}  className="min-heigth">
          {props.recipes.length > 0 && (
            props.recipes.slice(offset, offset + parPage)
              .map(recipe => (
                  <Grid item xs={6} sm={4} md={3} lg={2}>
                      <RecipeCard key={recipe.id} recommendedRecipe={recipe} />
                  </Grid>
              ))
          )}
              
      </Grid>

      <div className="spacer-md"/>
      <Pagination className="text-center"
        limit={parPage}
        offset={offset}
        total={props.recipes.length}
        onClick={(e, offset) => handleClickPagination(offset)}
      />
    </div>
  );
}

export default Recipe