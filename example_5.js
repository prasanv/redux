/* 
  EXample 45 things to notice 
    - We are performing Asynchronous operation using Redux Thunk middleware and Axios library
*/

const redux = require('redux');
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;
const reduxThunk= require('redux-thunk');

console.log({reduxThunk});
const reduxThunkMiddleware = reduxThunk.default;

const axios = require('axios');

const initialState = {
  loading: false,
  users: [],
  error:''
}


const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'


const fetch_users_request = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  }
}

const fetch_users_succeeded = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users
  }
}

const fetch_users_failed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error
  }
}


const reducer = (currentState = initialState, action) => {

  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return { 
        ...currentState, 
        loading: true,
        
      }
    case FETCH_USERS_SUCCEEDED:
      return { 
        loading: false,
        users: action.payload,
        error:''
        
      }
    case FETCH_USERS_FAILED:
      return { 
        loading: false,
        users: [],
        error: action.payload
      }
    default:
      return currentState
  }
}

// ASYNC action creators
const fetchUsers = () => {
  return function(dispatch){
    dispatch(fetch_users_request())
    axios("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        console.log('Success:', response.data.map(user => user.id)); 
        fetch_users_succeeded(response.data)
      })
      .catch((error) => { 
        console.error('Error:', error.message); 
        fetch_users_failed(error.message)
      });
  }
}


const store =  createStore(reducer, applyMiddleware(reduxThunkMiddleware));


const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch(fetchUsers());

unsubscribe();