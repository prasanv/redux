
/* 
  EXample 1 things to notice 
  - We are using payload property inside the actions
  - we are using new redux method called bindActionCreators
*/

const redux = require('redux');
const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;

console.log(redux);

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';


function order_cake() {
  return {
    type: CAKE_ORDERED,
    payload: {quantity: 1},
  }
}

function restock_cake(qty =1) {
  return {
    type: CAKE_RESTOCKED,
    payload: {quantity: qty},

  }
}


const initialState = {
  numOfCakes : 10,
  numOfChocolates : 100,
}


const reducer = (currentState = initialState, action) => {
  console.log({action})

  switch (action.type) {
    case CAKE_ORDERED:
      return { 
        ...currentState, 
        numOfCakes: currentState.numOfCakes - 1 
      }
      case CAKE_RESTOCKED:
        return { 
          ...currentState, 
          numOfCakes: currentState.numOfCakes + action.payload.quantity 
        }
      default:
      return currentState
  }
}


const store =  createStore(reducer);


console.log('store initial application state', store.getState());


const unsubscribe = store.subscribe(() => 
  {
    console.log('store is subscribed and log is prints updated state after every dispatch = ', store.getState())
  }
);

const actions = bindActionCreators({order_cake, restock_cake}, store.dispatch)

actions.order_cake();
actions.order_cake();

actions.restock_cake(100);

unsubscribe();

