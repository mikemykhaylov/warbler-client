import callApi from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errorActions';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function authUser(type, userData) {
  return async (dispatch) => {
    const response = await callApi('post', `api/auth/${type}`, userData);
    if (response.error) {
      dispatch(addError(response.error.message));
    } else {
      const { token, ...user } = response;
      localStorage.setItem('jwtToken', token);
      dispatch(setCurrentUser({ ...user, token }));
      dispatch(removeError());
      console.log('Logged in');
    }
  };
}
