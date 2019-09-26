// import { SEARCH_MODEL } from '../actions/types'


const modelReducer = (state = [], action) => {
    switch(action.type){
        case 'SEARCH_MODEL':
            return [action.payload];
        default:
            return state;
    };
};
export default modelReducer;