import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {push} from 'connected-react-router';
import { useSelector,useDispatch } from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {deleteRecipe} from '../../redux/recipes/operations';
import { getUserId } from '../../redux/users/selecotors';

const useStyles = makeStyles(() => ({
  media: {
    height: 140,
    // maxWidth: "150px",
  },
  content: {
    display: 'flex',
    textAlign: 'left',
    padding: "10px 10px 10px 10px",
  },
  icon: {
    marginRight: 0,
    marginLeft: 'auto',
    paddingRight:0,
  },
}));

const RecipeCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  return (
    <>
      <Card key={1}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            image= {props.recipe.images.length == 0 ?  "/static/images/cards/no-image.png"
              : props.recipe.images[0].path}
            title="Contemplative Reptile"
            onClick={() => dispatch(push('/recipe/detail/' + props.recipe.id))}
          />
          <CardContent className={classes.content}>
            <div onClick={() => dispatch(push('/recipe/detail/' + props.recipe.id))}>
              <Typography gutterBottom variant="caption" component="p">
                {props.recipe.recipeName}
              </Typography>
            </div>
            <IconButton className={classes.icon} onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  dispatch(push('/recipe/edit/' + props.recipe.id))
                  handleClose()
                }}
              >
                編集する
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(deleteRecipe(props.recipe.id, uid))
                  handleClose()
                }}
              >
                削除する
              </MenuItem>
            </Menu>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default RecipeCard