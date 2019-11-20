import { combineReducers } from "redux";

import SessionErrorsReducer from "./session_errors_reducer";
import UserErrorsReducer from "./user_errors_reducer";
import RideErrorsReducer from "./ride_errors_reducer";
import ReviewErrorsReducer from "./review_errors_reducer"

export default combineReducers({
  session: SessionErrorsReducer,
  user: UserErrorsReducer,
  ride: RideErrorsReducer,
  review: ReviewErrorsReducer
});
