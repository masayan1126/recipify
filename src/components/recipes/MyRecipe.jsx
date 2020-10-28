import React,{useCallback, useState, useEffect} from 'react';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';


const MyRecipe = (props) => {
    const [fade, setFade] = useState(false);

    // useEffect(() => {
    //     setFade(true);
    
    // }, [])

    return(
        <div>
            {/* { <TransitionGroup> */}
                {props.myRecipes.map((myRecipe, index) => (
                    // <CSSTransition key={index}
                    //     in={fade}
                    //     timeout={400}
                    //     classNames="fade"
                    // > */}
                    <li>{ myRecipe.recipeName }</li>
                    // { </CSSTransition>
                ))}
            {/* </TransitionGroup> */}
        </div>
    )
}
export default MyRecipe