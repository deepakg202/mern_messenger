import axios from "axios";

import {
  SESSION_REQUEST,
  SESSION_SUCCESS,
  SESSION_FAILED,
  SESSION_REMOVED,
} from "../constants/sessionConstants";

export const createSession = (username, password) => async (dispatch) => {
  dispatch({ type: SESSION_REQUEST });
  try {
    const {data} = await axios.post("/api/login", {username, password});
    dispatch({ type: SESSION_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: SESSION_FAILED, payload: error.response.data.message });
  }
}

export const getSession = () => async (dispatch) => {
  dispatch({ type: SESSION_REQUEST });
  try {
    const data = await axios.post("/api/session");
    dispatch({ type: SESSION_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: SESSION_FAILED, payload: error.response.data.message });
  }
};

export const removeSession = () => {
  return { type: SESSION_REMOVED };
}
