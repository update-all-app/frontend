import React, { useContext, useState } from 'react'
import UserContext from './../context/UserContext'
import Navbar from './Navbar'
import { useHistory, Redirect } from 'react-router-dom'


export default function Home(props){

    const user = useContext(UserContext).state
    console.log(user.data)
    const history = useHistory()
    if(!user.businesses){
        return <Redirect to="/businesses/new" />
    }else{
        return(
            <div>
                <Navbar />
                <p>Home!</p>
                <p>{user.data.name}</p>
            </div>
            
        )
    }
    
    
}

