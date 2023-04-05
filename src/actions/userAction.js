import Axios from "../api/auth";
import {
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

export const getUser = () => async (dispatch, getState) => {
  dispatch({
    type: USER_REQUEST,
  });
  try {
    const res = await Axios.get("/user/all");
    dispatch({
      type: USER_SUCCESS,
      payload: res.data,
    });

    // localStorage.setItem("user", JSON.stringify(getState().user.user));
  } catch (error) {
    dispatch({
      type: USER_FAILED,
      payload:
        error?.response?.data?.message && error?.response
          ? error?.response?.data?.message
          : error?.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({
    type: USER_DELETE_REQUEST,
  });
  try {
    const res = await Axios.post("/user/delete/" + id);
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: { id },
    });

    // localStorage.setItem("user", JSON.stringify(getState().user.user));
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILED,
      payload:
        error?.response?.data?.message && error?.response
          ? error?.response?.data?.message
          : error?.message,
    });
  }
};

// export const getUserOne = () => async (dispatch, getState) => {
//     dispatch({
//       type: USER_REQUEST,
//     });
//     try {
//       const res = await Axios.get("/users/stageOne/"+ id);
//       dispatch({
//         type: USER_SUCCESS,
//         payload: res.data,
//       });

//       localStorage.setItem("user", JSON.stringify(getState().user.user));
//     } catch (error) {
//       dispatch({
//         type: USER_FAILED,
//         payload:
//           error?.response?.data?.message && error?.response
//             ? error?.response?.data?.message
//             : error?.message,
//       });
//     }
//   };

export const saveStageOne = (user) => async (dispatch) => {
  dispatch({
    type: USER_SAVE_ONE_REQUEST,
  });
  try {
    const res = await Axios.post("/user/create", user);
    dispatch({
      type: USER_SAVE_ONE_SUCCESS,
      payload: { data: res.data, user: user },
    });
  } catch (error) {
    dispatch({
      type: USER_SAVE_ONE_FAILED,
      payload:
        error?.response?.data?.message && error?.response
          ? error?.response?.data?.message
          : error?.message,
    });
  }
};

export const saveStageTwo = (user) => async (dispatch, getState) => {
  dispatch({
    type: USER_SAVE_ONE_REQUEST,
  });
  try {
    const res = await Axios.post("/user/update", user);
    dispatch({
      type: USER_SAVE_ONE_SUCCESS,
      payload: { data: res.data, user: user },
    });
  } catch (error) {
    dispatch({
      type: USER_SAVE_ONE_FAILED,
      payload:
        error?.response?.data?.message && error?.response
          ? error?.response?.data?.message
          : error?.message,
    });
  }
};
