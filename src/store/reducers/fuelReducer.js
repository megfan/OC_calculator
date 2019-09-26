
const fuelReducer = (state = [], action) => {
    switch(action.type){
        case 'SEARCH_FUEL':
            return [action.payload];
        default:
            return state;
    };
};
export default fuelReducer;