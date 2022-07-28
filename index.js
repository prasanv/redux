const redux = require('redux');
// since createStore is deprecated  instead of const createStore = redux.createStore; we are using the below code  
const createStore = redux.legacy_createStore;


// Action is object with type property and  type prop should always be a constant
const CAKE_ORDERED = 'CAKE_ORDERED';

// Action Creator is a function that returns a Action object 
function order_cake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  }
}

// initial State
const initialState = {
  numOfCakes : 10,
  numOfChocolates : 100,
}

// Reducer is a function that accepts state and action as argument
const reducer = (state = initialState, action) => {
  
  console.log('This is what action holds',{action});

  switch (action.type) {
    case CAKE_ORDERED:
      return { 
        ...state, 
        numOfCakes: state.numOfCakes - 1 
      }
    default:
      return state
  }
}


const store =  createStore(reducer);

console.log('store initial application state', store.getState());

store.subscribe(()=> console.log('update state', store.getState()));

store.dispatch(order_cake());
store.dispatch(order_cake());
store.dispatch(order_cake());

// store.unsubscribe();