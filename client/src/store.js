import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const followersReducer = function (state = {}, action) {
  switch (action.type) {
    case 'FOLLOWERS_RECEIVED':
      return { ...state, users: action.users, prevCursor: action.prevCursor, nextCursor: action.nextCursor };
    case 'SORT_FOLLOWERS':
      return { ...state, users: action.users, sortBy: action.sortBy };
    default:
      return state;
  }
}

const reducers = combineReducers({
  followersState: followersReducer
});


const store = createStore(reducers, composeWithDevTools());

export default store;