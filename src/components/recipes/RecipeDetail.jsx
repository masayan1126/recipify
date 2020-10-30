
import React,{useCallback, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import { getUserId } from '../../redux/users/selecotors';
import { getRecipes } from '../../redux/recipes/selecotors';
import { fetchRecommendedRecipe } from '../../redux/recipes/operations';
import { RecipeCardDetail } from './index';

const useStyles = makeStyles((theme) => ({
    sliderBox: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 24px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 400,
            width: 400
        },
    },
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400
        },
    },
    price: {
        fontSize: 36
    }
}))

const RecipeDetail = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const recipes = getRecipes(selector);
    const uid = getUserId(selector);

    const path = selector.router.location.pathname;
    const id = path.split('/recipe/detail')[1];

    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        dispatch(fetchRecommendedRecipe(uid))
        db.collection("recipes").doc(id).get()
            .then(doc => {
                const data = doc.data();
                setRecipe(data);
            })

    }, [])

    return(
        <section className="">
            {
                recipe && (
                    <RecipeCardDetail recipe={recipe} id={id}/>
                )
            }
        </section>
    )
}
export default RecipeDetail