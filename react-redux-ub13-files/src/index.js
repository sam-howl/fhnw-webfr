import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";

const functionMap = new Map()
functionMap.set('UPDATE_FILTER_TERM', (state, value) => {return { ...state, filterTerm: value }})

const reducer = (state, action) => {
    if (functionMap.has(action.type)){
        return functionMap.get(action.type)(state, action.filterTerm)
    } else {
        return state
    }
}

const initialState = { 
    movies: [
        { rank: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994 },
        { rank: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 },
        { rank: 3, title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008 },
        { rank: 4, title: 'The Godfather: Part II', director: 'Francis Ford Coppola', year: 1974 },
        { rank: 5, title: 'The Lord of the Rings: The Return of the King', director: 'Peter Jackson', year: 2003 },
        { rank: 6, title: 'Pulp Fiction', director: 'Quentin Tarantino', year: 1994 },
        { rank: 7, title: 'Schindlers List', director: 'Steven Spielberg', year: 1993 },
        { rank: 8, title: '12 Angry Men', director: 'Sidney Lumet', year: 1957 },
        { rank: 9, title: 'Fight Club', director: 'David Fincher', year: 1999 }
    ], 
    filterTerm: '' 
};
const store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
