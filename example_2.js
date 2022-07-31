/* 
  EXample 2 things to notice 
    - We are using Multiple Reducer, pay attention to the initial app state object in the Terminal
*/

const redux = require('redux');
const createStore = redux.legacy_createStore;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';



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

function order_icecream() {
  return {
    type: ICECREAM_ORDERED,
    payload: {quantity: 1},
  }
}

function restock_icecream(qty =1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: {quantity: qty},

  }
}


const initialCakeState = {
  numOfCakes : 10,
}

const initialIceCreamState = {
  numOfIceCreams : 100,
}

const cakeReducer = (currentState = initialCakeState, action) => {

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

const iceCreamReducer = (currentState = initialIceCreamState, action) => {

  switch (action.type) {
      case ICECREAM_ORDERED:
        return { 
          ...currentState, 
          numOfIceCreams: currentState.numOfIceCreams - 1 
        }
      case ICECREAM_RESTOCKED:
        return { 
          ...currentState, 
          numOfIceCreams: currentState.numOfIceCreams + action.payload.quantity 
        }
      default:
      return currentState
  }
}

// Combining Multiple Reducers
const rootReducer = redux.combineReducers({
  cake: cakeReducer, 
  iceCream:iceCreamReducer
})

const store =  createStore(rootReducer);

console.log('store initial application state', store.getState());

const unsubscribe = store.subscribe(() => 
  {
    console.log('store is subscribed and log is prints updated state after every dispatch = ', store.getState())
  }
);

const actions = redux.bindActionCreators({order_cake, restock_cake, order_icecream, restock_icecream}, store.dispatch)

actions.order_cake();
actions.order_cake();

actions.restock_cake(100);

actions.order_icecream();

actions.restock_icecream(1000);

unsubscribe();

