import { combineReducers } from 'redux';
import brandReducer from './brandReducer';
import modelReducer from './modelReducer';
import fuelReducer from './fuelReducer';

export default combineReducers({
    brands: brandReducer,
    models: modelReducer,
    fuels: fuelReducer
});