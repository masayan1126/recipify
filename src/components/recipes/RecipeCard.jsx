import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {push} from 'connected-react-router';
import { useDispatch } from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {deleteRecipe} from '../../redux/recipes/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "200",
    // flexGrow: 1,
  },
  media: {
    height: 150,
    maxWidth: "200",
  },
  content: {
    display: 'flex',
    textAlign: 'left',
    '&:last-child': {
        paddingBottom: 5
    }
  },
  icon: {
    marginRight: 0,
    marginLeft: 'auto'
},
}));

const RecipeCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  return (
    <div>
      
      <Card key={1}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            image= {props.recommendedRecipe.images[0].path}
            title="Contemplative Reptile"
            onClick={() => dispatch(push('/recipe/' + props.recommendedRecipe.id))}
          />
          <CardContent className={classes.content}>
            <div onClick={() => dispatch(push('/recipe/' + props.recommendedRecipe.id))}>
              <Typography gutterBottom variant="caption" component="p">
                {props.recommendedRecipe.recipeName}
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
                  dispatch(push('/recipe/edit/' + props.recommendedRecipe.id))
                  handleClose()
                }}



              >
                編集する
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(deleteRecipe(props.recommendedRecipe.id))
                  handleClose()
                }}
              >
                削除する
              </MenuItem>
            </Menu>
          </CardContent>
        </CardActionArea>
      </Card>
    
    </div>
  );
}

export default RecipeCard