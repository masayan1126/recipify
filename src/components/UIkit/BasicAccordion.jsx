import React,{useCallback, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import { vegs, meats, fishes, cereals, potatoes_starches_beans_mushrooms } from '../../ingredients';
import { searchFromIngredients } from '../../redux/recipes/operations';
import { useDispatch, useSelector } from 'react-redux';
import {TextInput, SelectBox, PrimaryButton} from "../UIkit/index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const BasicAccordion = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const [selected, setSelected] = useState(false);
  // const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [veg, setVeg] = useState(""),
  [meat, setMeat] = useState(""),
  [fish, setFish] = useState(""),
  [cereal, setCereal] = useState(""),
  [others, setOthers] = useState("");

  const searchRecipe = (veg, meat, fish, cereal, others) => {
    const selectedIngredients = [
      { "category": "野菜", "name": veg },
      { "category": "肉", "name": meat },
      { "category": "魚", "name": fish },
      { "category": "穀類", "name": cereal },
      { "category": "その他", "name": others },

    ]

    dispatch(searchFromIngredients(selectedIngredients))
  }


  // const addSelectedIngredients = useCallback((selectedIngredients) => {
  //   setSelectedIngredients(prevResults => {
  //       return [...prevResults, selectedIngredients]
  //   })
  // },[setSelectedIngredients]);

  // const selectIngredients = useCallback((ingredients, category ,index, checked) => {
  //   const selectedIngredientsNameArr = selectedIngredients.map((data) => data.name)
  //   if (selectedIngredientsNameArr.includes(ingredients)) {
  //     alert("その食材はすでに選択されています")
  //     setSelected(!selected)
  //     return
    
  //   } else {
  //     addSelectedIngredients({
  //       "id": String(index),
  //       "name":ingredients,
  //       "category": category,
  //     })
  //     setSelected(!selected)

  //   }
  // })

  return (
    <div className={classes.root}>
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>{ "野菜類" }</Typography>
          </AccordionSummary>

          {vegs.map((veg, index) =>
          <AccordionDetails onClick={() => selectIngredients(veg.name, veg.category, index, selected)}>
            <Typography>
              <li key={index}><Checkbox checked={selected} />{veg.name}</li>
            </Typography>
          </AccordionDetails>
          )}
        </Accordion> */}
        <div className="form-container">
          <SelectBox
            label={"食材(野菜)"} required={true} options={vegs} select={setVeg} value={veg}
          />

          <SelectBox
            label={"食材(肉)"} required={true} options={meats} select={setMeat} value={meat}
          />   

          <SelectBox
            label={"食材(魚)"} required={true} options={fishes} select={setFish} value={fish}
          />  

          <SelectBox
            label={"食材(穀類)"} required={true} options={cereals} select={setCereal} value={cereal}
          />  

          <SelectBox
            label={"食材(芋・でん粉・豆・キノコ類)"} required={true} options={potatoes_starches_beans_mushrooms} select={setOthers} value={others}
          />   
        </div>

        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>{ "肉類" }</Typography>
          </AccordionSummary>

          {meats.map((meat, index) =>
          <AccordionDetails onClick={() => selectIngredients(meat.name, meat.category, index)}>
            <Typography>
              <li key={index}><Checkbox checked={selected} />{meat.name}</li>
            </Typography>
          </AccordionDetails>
          )}
        </Accordion> */}

                 
        {/* <SelectBox
          label={"晩ご飯"} required={true} options={recipes} select={setDinner} value={dinner}
        /> */}

        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>{ "魚類" }</Typography>
          </AccordionSummary>

          {fishes.map((fish, index) =>
          <AccordionDetails onClick={() => selectIngredients(fish.name, fish.category, index)}>
            <Typography>
              <li key={index}><Checkbox checked={selected} />{fish.name}</li>
            </Typography>
          </AccordionDetails>
          )}
        </Accordion> */}

        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>{ "穀類" }</Typography>
          </AccordionSummary>

          {cereals.map((cereal, index) =>
          <AccordionDetails onClick={() => selectIngredients(cereal.name, cereal.category, index)}>
            <Typography>
              <li key={index}><Checkbox checked={selected} />{cereal.name}</li>
            </Typography>
          </AccordionDetails>
          )}
        </Accordion> */}

        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>{ "芋・でん粉・豆・キノコ類" }</Typography>
          </AccordionSummary>

          {potatoes_starches_beans_mushrooms.map((potatoes_starches_beans_mushroom, index) =>
          <AccordionDetails onClick={() => selectIngredients(potatoes_starches_beans_mushroom.name, potatoes_starches_beans_mushroom.category, index)}>
            <Typography>
              <li key={index}><Checkbox checked={selected} />{potatoes_starches_beans_mushroom.name}</li>
            </Typography>
          </AccordionDetails>
          )}
        </Accordion> */}
        <div className="spacer-sm"/>
            <div className="center">
                <PrimaryButton
                    label={"レシピを検索"}
                    onClick={() => searchRecipe(veg, meat, fish, cereal, others)}
                    // onClick={() => console.log(selectedIngredients)}
                />
            </div>
      </div>
  );
}

export default BasicAccordion