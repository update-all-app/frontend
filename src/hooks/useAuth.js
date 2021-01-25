import React,
{
    useContext
} 
from 'react'

import UserContext from '../context/UserContext'
import ApiManager from '../helpers/ApiManager'

export default function useAuth(){

    const user = useContext(UserContext).state
    // const loggedIn = await ApiManager.getToken() // <-- This or ContextAPI?
    const loggedIn = Object.keys(user.data).length > 0
    const loading = user.loading
    return [loggedIn, loading]

}