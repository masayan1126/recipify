import React from 'react';

const MyRecipe = (props) => {
    return(
        props.myRecipes.map((myRecipe, index) => (
            <li>{ myRecipe.recipeName }</li>
        ))
    )
}
export default MyRecipe