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
import TableHead from '@material-ui/core/TableHead';
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
    }
})

const SetIngredients = (props) => {

    console.log(props.ingredients);
    const classes = useStyles()

    const [index, setIndex] = useState(0),
          [ingredients, setIngredients] = useState("");

    const inputIngredients = useCallback((event) => {
        setIngredients(event.target.value)
    }, [setIngredients]);

    const addIngredients = (index, ingredients) => {
        if (ingredients === "") {
            // Required input is blank
            return false
        } else {
            if (index === props.ingredients.length) {
                props.setIngredients(prevState => [...prevState, {ingredients: ingredients}]);
                setIndex(index + 1);
                setIngredients("");
            } else {
                const newIngredients = props.ingredients;
                newIngredients[index] = {ingredients: ingredients};
                props.setIngredients(newIngredients);
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
        const newIngredients = props.ingredients.filter((item, index) => index !== deleteIndex)
        props.setIngredients(newIngredients);
    }

    useEffect(() => {
        setIndex(props.ingredients.length)
    },[props.ingredients.length])
    
    return(
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>食材名</TableCell>
                            <TableCell className={classes.iconCell} />
                            <TableCell className={classes.iconCell} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.ingredients.length > 0 && (
                            props.ingredients.map((item, i) => (
                                <TableRow key={item.ingredients}>
                                    <TableCell component="th" scope="row">{item.ingredients}</TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => editIngredients(i, item.ingredients)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => deleteIngredients(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fullWidth={false} label={"食材名(複数可)"} multiline={false} required={true}
                        onChange={inputIngredients} rows={1} value={ingredients} type={"text"}
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addIngredients(index, ingredients)}>
                    <CheckCircleIcon/>
                </IconButton>
            </TableContainer>

        </div>

    )
}
export default SetIngredients