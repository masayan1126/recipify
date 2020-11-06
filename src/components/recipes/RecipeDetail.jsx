
import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { getUserId } from '../../redux/users/selecotors';
import { getRecipes } from '../../redux/recipes/selecotors';
import { RecipeCardDetail } from './index';

const RecipeDetail = () => {
    const selector = useSelector((state) => state);
    const recipes = getRecipes(selector);
    const uid = getUserId(selector);
    const recipesRef = db.collection("users").doc(uid).collection("recipes")
    const path = selector.router.location.pathname;
    const id = path.split('/recipe/detail')[1];
    const [recipe, setRecipe] = useState(null);

    // 選択されたレシピデータを取得
    useEffect(() => {
        recipesRef.doc(id).get()
            .then(doc => {
                const data = doc.data();
                setRecipe(data);
            })
    }, [])

    return(
        <section>
            {recipe && (
                <RecipeCardDetail recipe={recipe} id={id}/>
            )}
        </section>
    )
}
export default RecipeDetail