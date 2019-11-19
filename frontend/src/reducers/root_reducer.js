import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import users from "./users_reducer";
const rootReducer = combineReducers({
  session,
  users,
  errors
});

export default rootReducer;
