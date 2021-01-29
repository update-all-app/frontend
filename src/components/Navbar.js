import React from 'react'
import useAuth from '../hooks/useAuth'

import LandingNavbar from './LandingNavbar'
import LoggedInNavbar from './LoggedInNavbar'

export default function Navbar(props){

    const [loggedIn, loading] = useAuth()

    return loggedIn ? <LoggedInNavbar /> : <LandingNavbar />

}
