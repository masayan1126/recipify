import React, {useCallback, useEffect, useState} from 'react';
import {TextInput} from "../UIkit/index";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    checkIcon: {
        float: 'right'
    },
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    },
    paddingLeft: {
        paddingLeft: "10px"
    }
})

// 食材登録・編集画面の複数登録用コンポーネント（テーブル）
const SetIngredients = (props) => {
    const classes = useStyles()

    const [index, setIndex] = useState(0),
          [ingredients, setIngredients] = useState("");

    const inputIngredients = useCallback((event) => {
        setIngredients(event.target.value)
    }, [setIngredients]);

    const addIngredients = (index, ingredients) => {
        if (ingredients === "") {
            return false
        } else {
            if (index === props.ingredientsList.length) {
                props.setIngredientsList(prevState => [...prevState, {
                    id: `U_${String(index)}`, category: props.category, name: ingredients
                }]);
                setIndex(index + 1);
                setIngredients(ingredients);
                setIngredients("");
                
            } else {
                const newIngredients = props.ingredientsList;
                newIngredients[index] = {category: props.category, name: ingredients};
                props.setIngredientsList(newIngredients);
                setIndex(newIngredients.length);
                setIngredients("");
            }
        }
    }

    const editIngredients = (index, ingredients) => {
        setIndex(index)
        setIngredients(ingredients)
    }

    const deleteIngredients = (deleteIndex) => {
        const newIngredients = props.ingredientsList.filter((item, index) => index !== deleteIndex)
        props.setIngredientsList(newIngredients);
    }

    // indexのstateに食材一覧の配列の長さをセットする
    useEffect(() => {
        setIndex(props.ingredientsList.length)
    },[props.ingredientsList.length])
    
    return(
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        {props.ingredientsList.length > 0 && (
                            props.ingredientsList.map((item, i) => (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell}
                                            onClick={() => editIngredients(i, item.name)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell}
                                        onClick={() => deleteIngredients(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div className={classes.paddingLeft}>
                    <TextInput
                        fullWidth={false} label={"食材名(複数可)"} multiline={false} required={true}
                        onChange={inputIngredients} rows={1} value={ingredients} type={"text"}
                    />
                </div>
                <IconButton className={classes.checkIcon} 
                    onClick={() => addIngredients(index, ingredients)}>
                    <CheckCircleIcon/>
                </IconButton>
            </TableContainer>
        </>
    )
}
export default SetIngredients