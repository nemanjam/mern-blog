import {
  LOGIN_WITH_OAUTH_SUCCESS,
  LOGIN_WITH_OAUTH_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_WITH_EMAIL_SUCCESS,
  REGISTER_WITH_EMAIL_FAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAIL,
  ME_LOADING,
  ME_SUCCESS,
  ME_FAIL,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  me: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_WITH_EMAIL_SUCCESS:
    case LOGIN_WITH_EMAIL_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.token,
      };
    case ME_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ME_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        me: action.payload,
      };
    case LOGIN_WITH_OAUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        me: action.payload,
      };
    case LOGOUT_SUCCESS:
    case ME_FAIL:
    case REGISTER_WITH_EMAIL_FAIL:
    case LOGIN_WITH_EMAIL_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        me: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
