import callApi from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './error.actions';

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
      return false;
    }
    const { token, ...user } = response;
    localStorage.setItem('jwtToken', token);
    await dispatch(setCurrentUser({ ...user, token }));
    await dispatch(removeError());
    return true;
  };
}

export function logoutUser() {
  return async (dispatch) => {
    localStorage.removeItem('jwtToken');
    await dispatch(setCurrentUser({}))
  }
}
