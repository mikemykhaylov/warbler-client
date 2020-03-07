import callApi from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function authUser(type, userData) {
  return async (dispatch) => {
    const { token, ...user } = await callApi('post', `api/auth/${type}`, userData);
    localStorage.setItem('jwtToken', token);
    dispatch(setCurrentUser({ ...user, token }));
    console.log('Logged in');
  };
}
