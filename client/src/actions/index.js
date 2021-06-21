export const GET_ALL100 = 'GET_ALL100';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const GET_GENRE = 'GET_GENRE';
export const SORT_AZ = 'SORT_AZ';
export const SORT_SCORE = 'SORT_SCORE';
export const FILTER_BY = 'FILTER_BY';
export const SUBMIT = 'SUBMIT';


export function getAll() {
    return function(dispatch) {
        return fetch(`http://localhost:3001/api/videogames`)
        .then(response => response.json())
        .then(json=>{
            dispatch({
                type: 'GET_ALL100',
                payload: json,
            })
            console.log('GET_ALL100 ACTION');
        })
    }
}

export function getVideoGame(name) {
    return function(dispatch) {
        //Conexión front con back
        // La API Fetch proporciona una interfaz JavaScript para acceder y manipular partes del canal HTTP, 
        // tales como peticiones y respuestas.
        return fetch(`http://localhost:3001/api/videogames?name=${name}`)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: "GET_VIDEOGAMES",
                    payload: json
                });
                console.log(json, 'GET_VIDEOGAMES ACTION');
            });
    }        
}

export function getVideoGameDetail(id) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/api/detail/${id}`)
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: 'GET_VIDEOGAME_DETAIL',
                payload: json
            });
            console.log( json, "GET_VIDEOGAMES_DETAIL ACTION");
        });
    }
}

export function getGenre(){
    return function(dispatch) {
        return fetch(`http://localhost:3001/api/genres`)
            .then(response => response.json())
            .then(json =>{
                dispatch({
                    type: "GET_GENRE",
                    payload: json,
                })
            })
    }
}

export function sortAZ(payload){ //Asc o Desc
    return {
        type: 'SORT_AZ',
        payload: payload
    }
}

export function sortScore(payload){
    return {
        type: 'SORT_SCORE',
        payload: payload
    }
}

export function filterBy (payload) {
    return {
        type: 'FILTER_BY',
        payload: payload
    }
}

export function submit (payload) {
    return (dispatch) =>
    fetch('http://localhost:3001/api/create', {
       method: 'POST',
        headers: {
           accept: 'application/json', 'content-type': 'application/json'
        },
        body: JSON.stringify(payload), 
    })
    .then((res) => res.json())
    .then((json)=>{
        dispatch({
            type: 'SUBMIT',
            payload: json
        });
        console.log(json)
    })
}    





