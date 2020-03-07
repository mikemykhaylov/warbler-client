import { combineReducers } from 'redux';
import user from './userReducer';
import error from './errorReducer';

const rootReducer = combineReducers({
  user,
  error,
});

export default rootReducer;
