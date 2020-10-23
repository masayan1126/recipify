import React from 'react';
import { MyRecipe } from './index';
import { useSelector,useDispatch } from 'react-redux';
import { signInAction, signOutAction } from '../../redux/users/actions';
import { signOut } from '../../redux/users/operations';
import '../../assets/styles/style.css';

const myRecipes = [
    { recipeName: "サバのトマト煮", path: "/static/images/cards/サバのトマト煮.jpg" },
    { recipeName: "ホワイトシチュー", path: "/static/images/cards/ホワイトシチュー.jpeg" },
    { recipeName: "ぶり大根", path: "/static/images/cards/ぶり大根.jpg" },
    { recipeName: "フレンチトースト", path: "/static/images/cards/フレンチトースト.jpg" },
];


const MyRecipes = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    return(
        <div className="mt-small">
            <MyRecipe 
                myRecipes = {myRecipes}
            />
            <button onClick={() => dispatch(signOut()) }>サインアウト</button>
        </div>
    )
}
export default MyRecipes