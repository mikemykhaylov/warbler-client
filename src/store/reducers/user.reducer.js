import { SET_CURRENT_USER } from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {
    id: '',
    username: '',
    profileImageUrl: '',
    token: '',
  },
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: Object.keys(action.user).length > 0,
        user: Object.keys(action.user).length > 0 ? action.user : DEFAULT_STATE.user,
      };
    default:
      return { ...state };
  }
};
