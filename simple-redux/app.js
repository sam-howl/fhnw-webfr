//import { createStore } from 'redux'
const redux = require("redux");
const logFacotory = require("redux-logger");
const thunk = require("redux-thunk").default;
/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
// const initialState = { counter: 0, waiting: false };

// function counter(state = initialState, action) {
//   switch (action.type) {
//     case "INCREMENT":
//       return { counter: state.counter + 1 };
//     case "DECREMENT":
//       return { counter: state.counter - 1 };
//     case "WAITING":
//       return { ...state, waiting: true };
//     default:
//       return state;
//   }
// }

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1 ;
    case "DECREMENT":
      return state - 1 ;
    default:
      return state;
  }
};

const waitingReducer = (state = false, action) => {
  switch (action.type) {
    case "WAITING":
      return true;
    default:
      return state;
  }
};

const reducers = redux.combineReducers({
  counter: counterReducer,
  waiting: waitingReducer
});

//Logger
const logger = logFacotory.createLogger({
  colors: false
});

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
//let store = createStore(counter)
//let store = redux.createStore(counter, redux.applyMiddleware(thunk, logger));
let store = redux.createStore(reducers, redux.applyMiddleware(thunk, logger));
// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.
store.subscribe(() =>
  console.log("The actual state counter is " + store.getState().counter)
);

function incrementAsync() {
  return dispatch => {
    dispatch({ type: "WAITING" });
    setTimeout(() => {
      dispatch({ type: "INCREMENT" });
    }, 2000);
  };
}

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: "INCREMENT" });
// 1
store.dispatch({ type: "INCREMENT" });
// 2
store.dispatch({ type: "DECREMENT" });
// 1
store.dispatch(incrementAsync());
