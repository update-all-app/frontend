import React,
{
    useContext
} 
from 'react'

import UserContext from '../context/UserContext'

export default function useAuth(){

    const user = useContext(UserContext).state
    const loggedIn = !!user.data.name
    const loading = user.loading
    return [loggedIn, loading]

}