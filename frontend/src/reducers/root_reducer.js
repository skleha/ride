import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import users from "./users_reducer";
import modal from "./modal_reducers";
import reviews from "./review_reducers"


const rootReducer = combineReducers({
  session,
  users,
  errors,
  reviews,
  modal
});

export default rootReducer;
