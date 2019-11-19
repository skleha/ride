import { RECEIVE_USER, REMOVE_USER } from "../actions/user_actions";

export default function(state = {}, action) {
    Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
        return Object.assign({}, state, { [action.user.id]: action.user })
    case REMOVE_USER:
        let nextState = Object.assign({}, state);
        delete nextState[action.userId];
        return nextState;
    default:
      return state;
  }
}
