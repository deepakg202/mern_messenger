import {
  SESSION_REQUEST,
  SESSION_SUCCESS,
  SESSION_FAILED,
  SESSION_REMOVED,
} from "../constants/sessionConstants";


function sessionReducer(state = { loading: false, checked: false }, action) {
  switch (action.type) {
    case SESSION_REQUEST:
      return { ...state, loading: true };
    case SESSION_SUCCESS:
      return { ...state, loading: false, sessionInfo: action.payload, checked: true };
    case SESSION_FAILED:
      return { ...state, loading: false, error: action.payload, checked: true };
    case SESSION_REMOVED:
      return { ...state, sessionInfo:null, loading: false, checked: true };
    default:
      return state;
  }
}

export { sessionReducer };