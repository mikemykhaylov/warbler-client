import { combineReducers } from 'redux';
import user from './user.reducer';
import error from './error.reducer';
import messages from './messages.reducer';

const rootReducer = combineReducers({
  user,
  dbErrors: error,
  messages,
});

export default rootReducer;
