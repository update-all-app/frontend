
import {
    POPULATE_USER,
    LOADING,
    LOADING_COMPLETE,
    LOGOUT_USER,
    ADD_BUSINESS,
    POPULATE_BUSINESSES,
    VALIDATE_PAYMENT,
    ADD_BUSINESS_SERVICE
} from '../actionTypes'

export default function UserReducer(state, action){
    switch(action.type){
        case POPULATE_USER:
            return { data: action.payload, loading: false }
        case ADD_BUSINESS:
            const businesses = state.data.businesses ? state.data.businesses : []
            return {
                data: {
                    ...state.data, 
                    businesses: [...businesses, action.payload]
                },
                loading: false
            }
        case POPULATE_BUSINESSES:
            return {
                data: {
                    ...state.data,
                    businesses: action.payload
                },
                loading: false
            }
        case LOADING:
            return { data: {...state.data}, loading: true }
        case LOADING_COMPLETE:
            return { data: {...state.data}, loading: false}
        case LOGOUT_USER:
            return { data: {}, loading: false}
        case VALIDATE_PAYMENT:
            return {
                data: {...state.data, paymentStatusCurrent: true},
                loading: false
            }
        case ADD_BUSINESS_SERVICE:
            const foundBusiness = state.data.businesses.find(b => b.id === action.payload.business.id)
            if(!foundBusiness){
                return state
            }else{
                if(foundBusiness.services){
                    foundBusiness.services.push(action.payload.services)
                }else{
                    foundBusiness.services = [action.payload.service]
                }
                return {
                    data: {...state.data, businesses: state.data.businesses.map(b => {
                        return b.id === foundBusiness.id ? foundBusiness : b
                    })},
                    loading: false
                }
            }
        default:
            return state
    }
}