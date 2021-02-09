import React from 'react'
import useAuth from '../hooks/useAuth'

import LandingNavbar from './without_auth_flow/LandingNavbar'
import LoggedInNavbar from './LoggedInNavbar'

export default function Navbar(props){

    const [loggedIn, ] = useAuth()
    return loggedIn ? <LoggedInNavbar /> : <LandingNavbar />

}
