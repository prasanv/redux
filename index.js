const redux = require('redux');

console.log(redux);

/* since createStore is deprecated  instead of const createStore = redux.createStore; we are using the below code */
const createStore = redux.legacy_createStore;


// Action is object with type property and `type` prop should always be a constant
const CAKE_ORDERED = 'CAKE_ORDERED';

// Action Creator is a function that returns a Action object which consists of type and payload
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
const reducer = (currentState = initialState, action) => {
  
  // console.log('This is what action holds',{action});

  switch (action.type) {
    case CAKE_ORDERED:
      return { 
        ...currentState, 
        numOfCakes: currentState.numOfCakes - 1 
      }
    default:
      return currentState
  }
}

// Creates a Redux store
const store =  createStore(reducer);

// Log initial state of the application 
console.log('store initial application state', store.getState());

// Listener is setup on the store, any time the store updates log is print on terminal 
const unsubscribe = store.subscribe(() => 
  {
    console.log('store is subscribed and log is prints updated state after every dispatch = ', store.getState())
  }
);


store.dispatch(order_cake());
store.dispatch(order_cake());
store.dispatch(order_cake());

// Listener is unsubscribed, so any dispatch action called will not be logged on the terminal
unsubscribe();


/* 
  Even though the dispatch action is executed successfully, 
  there will be no print logs because it not subscribed 
*/
store.dispatch(order_cake());

// New Listener is setup on the store, any time the store updates a log is print on terminal 
const newUnsubscribe = store.subscribe(() => 
{
  console.log('store is subscribed **AGAIN** and log is prints updated state after every dispatch = ', store.getState())
}
);

// Example let the look at the updated application state
store.dispatch(order_cake());


newUnsubscribe();