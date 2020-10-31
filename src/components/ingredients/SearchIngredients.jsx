import React,{useCallback, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { BasicAccordion, PrimaryButton } from '../UIkit/index';

const useStyles = makeStyles({
    margin: {
        margin: 0
    }
})

const SearchIngredients = () => {
    const selector = useSelector((state) => state);
    const classes = useStyles();
    return(
        <div>
            <h3 className="title">食材を複数選択してください</h3>
            <BasicAccordion
            />
        </div>
    )
}
export default SearchIngredients