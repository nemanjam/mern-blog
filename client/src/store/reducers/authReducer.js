import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_USER_WITH_EMAIL_SUCCESS,
  REGISTER_USER_WITH_EMAIL_FAIL,
  LOGIN_USER_WITH_EMAIL_SUCCESS,
  LOGIN_USER_WITH_EMAIL_FAIL,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_WITH_EMAIL_SUCCESS:
    case LOGIN_USER_WITH_EMAIL_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.token,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
