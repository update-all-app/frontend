
import {
  ADD_REGULAR_EVENT,
  EDIT_REGULAR_EVENT,
  ADD_IRREGULAR_EVENT,
  EDIT_IRREGULAR_EVENT,
  DELETE_REGULAR_EVENT,
  DELETE_IRREGULAR_EVENT,
  SET_REGULAR_EVENTS,
  SET_IRREGULAR_EVENTS,
  CLEAR_EVENTS
} from '../actionTypes'

export default function UserReducer(state, action){
  switch(action.type){
      case ADD_REGULAR_EVENT:
        const newRegEvent = action.payload
        newRegEvent.id = state.regularEvents.length + 1
        newRegEvent.start = new Date(newRegEvent.start)
        newRegEvent.end = new Date(newRegEvent.end)
        return {
          ...state,
          regularEvents: [...state.regularEvents, newRegEvent]
        }
      case EDIT_REGULAR_EVENT:
        return {
          ...state,
          regularEvents: state.regularEvents.map(e => {
            return e.id === action.payload.id ? {...action.payload} : e
          })
        }
      case ADD_IRREGULAR_EVENT:
        const newIrregEvent = action.payload
        newIrregEvent.id = state.irregularEvents.length + 1
        newIrregEvent.start = new Date(newIrregEvent.start)
        newIrregEvent.end = new Date(newIrregEvent.end)
        return {
          ...state,
          irregularEvents: [...state.irregularEvents, newIrregEvent]
        }
      case EDIT_IRREGULAR_EVENT:
        return {
          ...state,
          irregularEvents: state.irregularEvents.map(e => {
            return e.id === action.payload.id ? {...action.payload} : e
          })
        }
      case DELETE_REGULAR_EVENT:
        return {
          ...state,
          regularEvents: state.regularEvents.filter(e => {
            return e.id !== action.payload.id
          })
        }
      case DELETE_IRREGULAR_EVENT:
        return {
          ...state,
          irregularEvents: state.irregularEvents.filter(e => {
            return e.id !== action.payload.id
          })
        }
      case SET_REGULAR_EVENTS:
        return {
          ...state,
          regularEvents: {...action.payload}
        }
      case SET_IRREGULAR_EVENTS:
        return {
          ...state,
          irregularEvents: {...action.payload}
        }
      case CLEAR_EVENTS:
        return {
          regularEvents: [],
          irregularEvents: []
        }
      default:
          return state
  }
}