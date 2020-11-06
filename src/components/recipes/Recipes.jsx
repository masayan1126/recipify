import React,{ useState } from 'react';
import Pagination from "material-ui-flat-pagination";
import { RecipeCard } from './index';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import {goBack} from 'connected-react-router'
import {FlashMessage} from "../../templates/index";

const Recipes = (props) => {
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0),
        [parPage, setParPage] = useState(8);

  const handleClickPagination = offset => {
    setOffset(offset)
  }
  
  return (
    <>
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
      <Grid container spacing={2}>
          {props.recipes.length > 0 && (
            props.recipes.slice(offset, offset + parPage)
              .map(recipe => (
                  <Grid item xs={6} sm={4} md={3} lg={2}>
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  </Grid>
              ))
          )}   
      </Grid>

      <div className="spacer-md"/>
      <Pagination className="text-center"
        limit={parPage}
        offset={offset}
        total={props.recipes.length}
        onClick={(offset) => handleClickPagination(offset)}
      />
    </>
  );
}

export default Recipes