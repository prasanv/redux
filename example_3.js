/* 
  EXample 2 things to notice 
    - We are using Immer Library for update nested state properties
*/

const redux = require('redux');
const createStore = redux.legacy_createStore;
const immer = require('immer');
const produce = immer.produce;

// IMPORTANT: Check the terminal for all the methods returned by the Immer library
console.log(immer);

const initialUseDetails = {
  name : 'prasan',
  address: {
    street: '752 56 Ave N',
    City: 'West Vancouver',
    State: 'BC',
    Country: 'Canada'
  },
  telephoneNo: 6477783054
}


const UPDATE_STREET_ADDRESS = 'UPDATE_STREET_ADDRESS';

function  update_street_address(street_address) {
  return {
    type: UPDATE_STREET_ADDRESS,
    payload: street_address,
  }
}



const reducer = (currentState = initialUseDetails, action) => {

  switch (action.type) {
    case UPDATE_STREET_ADDRESS:
      // return { 
      //   ...currentState, 
      //   address: {
      //     ...currentState.address,
      //     street: action.payload
      //   }

      // }
      return produce(currentState, (draft)=>{
        draft.address.street = action.payload

      })
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

store.dispatch(update_street_address('123 Main Street'))

unsubscribe();

