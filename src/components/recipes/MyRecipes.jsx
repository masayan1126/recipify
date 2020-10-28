import React,{useCallback, useState, useEffect} from 'react';
import { MyRecipe } from './index';
import { useSelector,useDispatch } from 'react-redux';
import { signInAction, signOutAction } from '../../redux/users/actions';
import { signOut } from '../../redux/users/operations';
import '../../assets/styles/style.css';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

const myRecipes = [
    { recipeName: "サバのトマト煮", path: "/static/images/cards/サバのトマト煮.jpg" },
    { recipeName: "ホワイトシチュー", path: "/static/images/cards/ホワイトシチュー.jpeg" },
    { recipeName: "ぶり大根", path: "/static/images/cards/ぶり大根.jpg" },
    { recipeName: "フレンチトースト", path: "/static/images/cards/フレンチトースト.jpg" },
];


const MyRecipes = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const [fade, setFade] = useState(false);
    

  useEffect(() => {
        setFade(true);
    
    }, [])



    return(
        <div className="mt-small">
            <CSSTransition
                in={fade}
                timeout={400}
                classNames="fade"
            >
                <MyRecipe 
                    myRecipes = {myRecipes}
                />

            </CSSTransition>

            <button onClick={() => dispatch(signOut()) }>サインアウト</button>
        </div>
    )
}
export default MyRecipes