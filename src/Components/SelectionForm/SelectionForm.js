import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { useSelector, useDispatch } from 'react-redux';
import { searchBrand, searchModels, searchFuels } from '../../store/actions/carAction';

//Material UI styling
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& div': {
      color: 'var(--main-blue)',
      fontSize: 14,
      '& .Mui-disabled':{
        opacity: 0.4,
      },
    },
    '& label':{
      fontSize: 12,
      top: '-4px',
      backgroundColor: 'transparent',
    },    
  },
  button: {
    backgroundColor: 'var(--yellow)',
    color: 'var(--dark)',
    margin: '20px 16px',
    width: '100%',
    borderRadius: '50px',
    padding: '10px',
    transition: 'all .3s',
    fontWeight: 400,
    '&:hover': {
      boxShadow: '0px 10px 25px -3px rgba(0,0,0,0.2)',
      backgroundColor: 'var(--yellow)',
    },
    '& .MuiSvgIcon-root':{
      marginLeft: '20px',
    },
  },
  
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    width: '250px',
    height: '42px',
    fontSize: '5px',
    overflow: 'hidden',
     
    '& :hover:before': {
      borderBottom: '1px solid var(--main-blue)',
    },
    '& :after': {
      borderBottom: '2px solid var(--main-blue)',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(20),
  },
}));



function SelectionForm() {
  const classes = useStyles();
  const [brandsSearch, setBrands] = useState([]);
  const [brand, setBrand] = useState({
    type: '',
    name: 'hai',      
  });    
  const [model ,setModel] = useState({
    type: '',
    name: 'hai',
  });
  const [fuel ,setFuel] = useState({
    type: '',
    name: 'hai',
  });

  //input enables
  const [disableModels, enableModels] = useState(true);
  const [disableFuels, enableFuels] = useState(true);

  //basic redux states
  const brands = useSelector(state => state.brands);
  const models = useSelector(state => state.models);
  const fuels = useSelector(state => state.fuels);
  const dispatch = useDispatch();


  //fetching brands / first input
  useEffect( () => {
    dispatch(searchBrand());
    setBrands(brands);
  }, [brandsSearch]);

  function brandChange (event){
    //in case of changing brand clear rest of the inputs and disable them
    setModel({
      type: '',
      name: 'hai',
    });
    setFuel({
      type: '',
      name: 'hai',
    });
    enableFuels(true);
    enableModels(false);  

    setBrand(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));              
    dispatch(searchModels(event.target.value));  
    //each input value is send to localstorage
    localStorage.setItem('brand', brand.type);      
  };    

  function modelChanged (event){
    setModel(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    enableFuels(false);
    dispatch(searchFuels(event.target.value, brand.type));
    localStorage.setItem('model', model.type);
  };

  function fuelChanged (event){
    setFuel(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    localStorage.setItem('fuel', fuel.type);
  };
  

  return (
    <form className={classes.root} autoComplete="off">
        <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-car-simple">Marka</InputLabel>
            <Select
            className={classes.formLabel}
            value={brand.type}
            onChange={brandChange}
            inputProps={{
                name: 'type',
                id: 'filled-car-simple',
            }}                
            >
                {brands.map(item => {
                return item.map((brand, index) => {
                    return <MenuItem  
                    className={classes.formItem}         
                    key={index}
                    value={brand.make_name}>
                    {brand.make_name}                        
                </MenuItem>                    
                })})};
            </Select>
        </FormControl>
        <FormControl 
            variant="filled"
            className={classes.formControl}
            disabled={disableModels}>
            <InputLabel htmlFor="filled-model-simple">Model</InputLabel>
            <Select
            value={model.type}
            onChange={modelChanged}
            inputProps={{
                name: 'type',
                id: 'filled-model-simple',
            }}
            >                
                {models.length === 0 
                ? <MenuItem>{models[0]}</MenuItem>
                : models.map(item => {
                    return item.map((model, index) => {
                    return <MenuItem
                        key={index}
                        value={model.model_name}>
                        {model.model_name}
                    </MenuItem>
                })})}
            </Select>
        </FormControl>
        <FormControl 
            variant="filled"
            className={classes.formControl}
            disabled={disableFuels}>
            <InputLabel htmlFor="filled-fuel-simple">Typ paliwa</InputLabel>
            <Select
            value={fuel.type}
            onChange={fuelChanged}
            inputProps={{
                name: 'type',
                id: 'filled-fuel-simple',
            }}
            >               
                {fuels.length === 0 
                ? <MenuItem>{fuels[0]}</MenuItem>
                : fuels.map(item => {
                    return item.map((fuel, index) => {
                    return <MenuItem
                        key={index}
                        value={fuel.fuel_name}>
                        {fuel.fuel_name}
                    </MenuItem>
                })})}
            </Select>
        </FormControl>
        <Button 
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
            if(brand.type !== '' && model.type !== '') {
            window.location = (`https://www.mfind.pl/ubezpieczenie-oc-ac/kalkulator-oc-ac?make_name=${brand.type}&model_name=${model.type}`);                
            }else{
            alert('Proszę uzupełnić wszystkie pola!')
            }              
            }}
            target='_blank'
            rel='noopener'
            >
            Oblicz składkę
            <ArrowForwardIcon />
        </Button>
    </form>
  );
}

export default SelectionForm;
