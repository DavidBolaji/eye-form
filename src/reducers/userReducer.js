import {
  USER_ADD,
  USER_DELETE_FAILED,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_FAILED,
  USER_REQUEST,
  USER_SAVE_ONE_FAILED,
  USER_SAVE_ONE_REQUEST,
  USER_SAVE_ONE_SUCCESS,
  USER_SUCCESS,
} from "../constants/constants";

export const userReducer = (
  state = { user: [], curId: null, whatEye: null },
  action
) => {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, loading: true };
    case USER_SAVE_ONE_REQUEST:
      return { ...state, loading: true };
    case USER_DELETE_REQUEST:
      return { ...state, loading: true };
    case USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_SAVE_ONE_SUCCESS:
      return {
        loading: false,
        user: [...state.user],
        curId: action.payload.id,
        whatEye: action.payload.whatEye,
      };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        user: state.user.filter((e) => e._id !== action.payload.id),
        curId: null,
        whatEye: null,
      };
    case USER_FAILED:
      return { loading: false, error: action.payload };
    case USER_SAVE_ONE_FAILED:
      return { loading: false, error: action.payload };
    case USER_DELETE_FAILED:
      return { loading: false, error: action.payload };
    case USER_ADD:

    default:
      return state;
  }
};
