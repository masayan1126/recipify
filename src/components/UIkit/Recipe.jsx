import React,{useCallback, useState, useEffect} from 'react';
import Pagination from "material-ui-flat-pagination";
import { RecipeCard } from '../recipes/index';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
  fixBottom : {
    position:"fixed",
    bottom: 120,
    left:115,
  }
}));  


const Recipe = (props) => {

  const classes = useStyles();

  const [offset, setOffset] = useState(0),
        [parPage, setParPage] = useState(4);

  const handleClickPagination = offset => {
    setOffset(offset)
  }
  
  return (
    <div className={classes.root}>
      <h3 className="title">レシピ一覧</h3>
      <Grid container spacing={2}>
          {props.recipes.length > 0 && (
            props.recipes.slice(offset, offset + parPage)
              .map(recipe => (
                  <Grid item xs={6} sm={4} md={3} lg={2}>
                      <RecipeCard key={recipe.id} recommendedRecipe={recipe} />
                  </Grid>
              ))
          )}
              
      </Grid>

      <Pagination className="text-center" className={classes.fixBottom}
        limit={parPage}
        offset={offset}
        total={props.recipes.length}
        onClick={(e, offset) => handleClickPagination(offset)}
      />
    </div>
  );
}

export default Recipe