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
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: "0 auto",
    width: "80%",
  },
  media: {
    height: 20,
    paddingTop: '80%', 
  },
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

  return (
    <Card className={classes.root}>
      <CardHeader 
        title={props.recipe.recipeName}
      >
      </CardHeader>
      <CardMedia
        className={classes.media}
        image={props.recipe.images[0].path}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          ジャンル：{props.recipe.recipeGenre}<br/>カテゴリー：{props.recipe.recipeCategory}<br/>調理時間：{props.recipe.cookingTime}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" id="favIcon" onClick={() => toggleFav()}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}