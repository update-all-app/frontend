import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import Navbar from './Navbar'
// import LoggedInNavbar from './LoggedInNavbar'

export default function Home(props){

    const user = useContext(UserContext).state
    console.log(user.data)
    return(
        <div>
            <Navbar />
            <p>Home!</p>
            <p>{user.data.name}</p>
        </div>
        
    )
}

