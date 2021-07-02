import { GET_DBGAMES, GET_ALL100, GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, 
    GET_GENRE, SORT_AZ, SORT_SCORE, 
    FILTER_BY, SUBMIT, PREVIOUS_STATE } from '../actions/index';
// Axios es un paquete independiente de terceros que se puede instalar fácilmente en un proyecto React utilizando NPM.
// A diferencia de Axios, fetch() está integrado en la mayoría de los navegadores modernos.


// let vg =  [
//     {name: "Crash Racing", rating: 4, genre:[{name:"action"}, {name: "racing"}]},
//     {name: "Batman", rating: 7.5, genre:[{name:"action"}]},
//     {name: "SpiderMan", rating: 9, genre:[{name:"racing"}]},
//     {name:"Mortal Kombat", rating: 7, genre:[{name:"fight"}]}
// ]


function orderAZ (arr, orderKey/*name*/) {
    return arr.sort(function(a, b) {
        if(a[orderKey] < b[orderKey]){
            return -1;
        }
        if( a[orderKey] > b[orderKey]) {
            return 1;
        }
       return 0;
    });
};

function orderZA(arr, orderKey) {
    return arr.sort(function (a, b) {
        if(a[orderKey] < b[orderKey]) {
            return 1;
        }
        if( a[orderKey] > b[orderKey]) {
            return -1;
        }
        return 0;
    })
}

// llega un array y lo filtro por el campo elegido. 
function filterBy(arr, field) {
    let videogamesFiltered = [];
      for(let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].genres.length; j++) {
          if(arr[i].genres[j].name === field) {
            videogamesFiltered.push(arr[i])
          }
        }
    }
    return videogamesFiltered;
}

//  --------------------------------------------REDUCER----------------------------------------

let initialState = {
    videogamesLoaded: [],
    videogameDetail: {},
    genres: [],
    filtered: '',
    submit: '',
    videogameCreated: {},
    videogamesBeforeFilter: [],
}

function reducer (state = initialState, action) {

    if(action.type === GET_DBGAMES){
        return {
            ...state,
            videogamesLoaded: action.payload,
            videogamesBeforeFilter: action.payload
        }
    }

    if(action.type === GET_ALL100){
        return {
            ...state,
            videogamesLoaded: action.payload,
            videogamesBeforeFilter: action.payload
        }
    }

    if(action.type === GET_VIDEOGAMES){
        return {
            ...state,
            videogamesLoaded: action.payload,
            videogamesBeforeFilter: action.payload
        }
    }

    if(action.type === GET_VIDEOGAME_DETAIL) {
        return {
            ...state,
            videogameDetail: action.payload,
        }
    }

    if(action.type === GET_GENRE) {
        return {
            ...state,
            genres: action.payload
        }
    }

    if(action.type === SORT_AZ) {
        console.log('Reducer Sort_AZ')
        let sortVideogames = action.payload === 'AZ'?
        orderAZ(state.videogamesLoaded, 'name'):
        orderZA(state.videogamesLoaded, 'name');
        return {
            ...state,
            videogamesLoaded: sortVideogames,
        }
    }

    if(action.type === SORT_SCORE) {
        let sortVideogames = action.payload === 'Max'?
        orderZA(state.videogamesLoaded, 'rating'):
        orderAZ(state.videogamesLoaded, 'rating');
        return {
            ...state,
            videogamesLoaded: sortVideogames,
        }
    }

    if(action.type === FILTER_BY) {
        let filterVideogame = filterBy(state.videogamesLoaded, action.payload)
        return{
            ...state,
            videogamesLoaded: filterVideogame,
            filtered: `The videogames has been filtered by the ${action.payload} genre.`
        }
    }

    if (action.type === SUBMIT) {
        // axios.post('http://localhost:3001/api/create', action.payload); 
        return {
            ...state,
            videogameCreated:  action.payload,
            submit: 'The videogame has been created succesfully'
        }
    }

    if(action.type === PREVIOUS_STATE) {
        return {
            ...state,
            videogamesLoaded: state.videogamesBeforeFilter,
        }
    } 

    return state;
}
export default reducer;