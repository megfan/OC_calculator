

export const searchBrand = () => dispatch => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api-dev.mfind.pl/cars`, {
        headers: {
            'Authorization': ' Basic YXV0a2FfYXBpOmF1dGthX2FwaV8yMDE5',
        }})
        .then(res => res.json())
        .then(data => dispatch({
            type: 'SEARCH_BRAND',
            payload: data
            }));            
}

export const searchModels = (car) => dispatch => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api-dev.mfind.pl/cars/${car}/models`, {
        headers: {
            'Authorization': ' Basic YXV0a2FfYXBpOmF1dGthX2FwaV8yMDE5',
        }})
        .then(res => res.json())
        .then(data => dispatch({
            type: 'SEARCH_MODEL',
            payload: data
            }));            
}

export const searchFuels = (model, car) => dispatch => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api-dev.mfind.pl/cars/${car}/models/${model}/fuels `, {
        headers: {
            'Authorization': ' Basic YXV0a2FfYXBpOmF1dGthX2FwaV8yMDE5',
        }})
        .then(res => res.json())
        .then(data => dispatch({
            type: 'SEARCH_FUEL',
            payload: data
            }));            
}