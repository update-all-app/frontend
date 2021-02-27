
import {
  ADD_REGULAR_EVENT,
  EDIT_REGULAR_EVENT,
  ADD_IRREGULAR_EVENT,
  EDIT_IRREGULAR_EVENT,
  DELETE_REGULAR_EVENT,
  DELETE_IRREGULAR_EVENT
} from '../actionTypes'

export default function UserReducer(state, action){
  switch(action.type){
      case ADD_REGULAR_EVENT:
        break
      case EDIT_REGULAR_EVENT:
        break
      case ADD_IRREGULAR_EVENT:
        break
      case EDIT_IRREGULAR_EVENT:
        break
      case DELETE_REGULAR_EVENT:
        break
      case DELETE_IRREGULAR_EVENT:
        break
      default:
          return state
  }
}