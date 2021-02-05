
import {
    POPULATE_USER,
    LOADING,
    LOADING_COMPLETE,
    LOGOUT_USER,
    ADD_BUSINESS
} from '../actionTypes'

export default function UserReducer(state, action){
    switch(action.type){
        case POPULATE_USER:
            return { data: action.payload, loading: false }
        case ADD_BUSINESS:
            const businesses = state.data.businesses ? state.data.businesses : []
            console.log(businesses)
            return {
                data: {
                    ...state.data, 
                    businesses: [...businesses, action.payload]
                },
                loading: false
            }
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