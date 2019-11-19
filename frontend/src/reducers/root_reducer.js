import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import users from "./users_reducer";
import modal from "./modal_reducers";


const rootReducer = combineReducers({
  session,
  users,
  errors,
  modal
});

export default rootReducer;
