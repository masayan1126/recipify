import React,{useCallback, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {db, FirebaseTimestamp} from '../../firebase/index';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { getUserId } from '../../redux/users/selecotors';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    margin: "0 auto",
    width: "90%",
    boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important",
  },
  cardHeader: {
    padding: "8px 15px",
    
  },
  media: {
    paddingTop: '60%', 
  },
  cardContent: {
    padding: "8px 15px 0px 15px" 
  },
  cardActions: {
    justifyContent: "flex-end",
    padding: "2px 12px 12px 12px"
  },
  iconButton: {
    padding: "0px"
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [favFlag, setFavFlag] = useState(false);
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const recipesRef = db.collection('users').doc(uid).collection('recipes');

  const toggleFav = () => {
    const timestamp = FirebaseTimestamp.now();
    if (favFlag === false) {
      setFavFlag(true)
      const favIcon = document.getElementById("favIcon");
      favIcon.classList.add("bg-color__yellow");    
      recipesRef.doc(props.recipe.id).update({
        favorite: true,
        updated_at: timestamp,
      })
    } else {
      setFavFlag(false)
      const favIcon = document.getElementById("favIcon");
      favIcon.classList.remove("bg-color__yellow"); 
      recipesRef.doc(props.recipe.id).update({
        favorite: false,
        updated_at: timestamp,
      })
    }
  }

  // 選択したレシピのお気に入りフラグを確認して、真偽値に応じて背景色を変動させる
  useEffect(() => {
    recipesRef.doc(props.recipe.id).get()
        .then(doc => {
            const data = doc.data();
            if (data.favorite === true) {
              const favIcon = document.getElementById("favIcon");
              favIcon.classList.add("bg-color__yellow");
            }
        })
  }, [])

  useEffect(() => {
    if (props.recipe.recipeLink.length === 0) {
      return
    } else {
      const recipeSiteIcon = document.getElementById("recipe-site-icon");
      recipeSiteIcon.classList.add("bg-color__blue");
    }
  }, [])

  return (
    <div className="fadein__bottom__fast">

      <Card 
        className={classes.root}
      >
        <CardHeader className={classes.cardHeader}
          title={props.recipe.recipeName}
          titleTypographyProps={{variant:'h6' }}
        >
        </CardHeader>
        <CardMedia
          className={classes.media}
          image={props.recipe.images[0].path}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="body2" color="textSecondary" component="p">
            ジャンル：{props.recipe.recipeGenre}<br/>カテゴリー：{props.recipe.recipeCategory}<br/>調理時間：{props.recipe.cookingTime}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <IconButton aria-label="add to favorites" id="favIcon" 
            className={classes.iconButton} onClick={() => toggleFav()}>
            <FavoriteIcon />
          </IconButton>
          <IconButton 
            className={classes.iconButton}
            id="recipe-site-icon"
            href={
              props.recipe.recipeLink.length > 0 ? props.recipe.recipeLink : ""
            }
            target="_blank"
          >    
            <MenuBookIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}