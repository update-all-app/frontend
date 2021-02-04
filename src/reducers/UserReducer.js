
import {
    POPULATE_USER,
    LOADING,
    LOADING_COMPLETE,
    LOGOUT_USER
} from '../actionTypes'

export default function UserReducer(state, action){
    switch(action.type){
        case POPULATE_USER:
            return { data: action.payload, loading: false }
        case LOADING:
            return { data: {...state.data}, loading: true }
        case LOADING_COMPLETE:
            return { data: {...state.data}, loading: false}
        case LOGOUT_USER:
            return { data: {}, loading: false}
        default:
            return state
    }
}