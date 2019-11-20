
import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import users from "./users_reducer";
import modal from "./modal_reducers";
import reviews from "./review_reducers"
import rides from "./rides_reducer";



const rootReducer = combineReducers({
  rides,
  session,
  users,
  errors,
  reviews,
  modal
});

export default rootReducer;
