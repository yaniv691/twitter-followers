import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ACTIONS } from './constants';

const initailState = {
  isFetching: false, 
  apiCounter: 0
};

const followersReducer = function (state = initailState, action) {
  switch (action.type) {
    case ACTIONS.REQUEST_FOLLOWERS:
      return {
        ...state,
        isFetching: action.isFetching,
        apiCounter: action.apiCounter,
        screenName: action.screenName
      };

    case ACTIONS.FOLLOWERS_RECEIVED:
      return {
        ...state,
        users: action.users,
        prevCursor: action.prevCursor,
        nextCursor: action.nextCursor,
        isFetching: action.isFetching
      };

    case ACTIONS.SORT_FOLLOWERS:
      return {
        ...state,
        users: action.users,
        sortBy: action.sortBy
      };

    default:
      return state;
  }
}

const reducers = combineReducers({
  followersState: followersReducer
});


const store = createStore(reducers, composeWithDevTools());

export default store;