import {
  USER_ADD,
  USER_FAILED,
  USER_REQUEST,
  USER_SAVE_ONE_FAILED,
  USER_SAVE_ONE_REQUEST,
  USER_SAVE_ONE_SUCCESS,
  USER_SUCCESS,
} from "../constants/constants";

export const userReducer = (state = { user: [], curId: null }, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, loading: true };
    case USER_SAVE_ONE_REQUEST:
      return { ...state, loading: true };
    case USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_SAVE_ONE_SUCCESS:
      return {
        loading: false,
        ...state.user,
        curId: action.payload.id,
      };
    case USER_FAILED:
      return { loading: false, error: action.payload };
    case USER_SAVE_ONE_FAILED:
      return { loading: false, error: action.payload };
    case USER_ADD:

    default:
      return state;
  }
};
