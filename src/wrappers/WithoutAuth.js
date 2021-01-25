import React from 'react'
import { Redirect } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function WithAuth(props){

    const [loggedIn, loading] = useAuth()

  
    if(loading){
        return(
            <>
                <div className="overlay"></div>
                <div className="loader">Loading...</div>
            </>
        )
    }else if(!loading && loggedIn){
        return(
            <Redirect to="/home" />
        )
    }else{
        return(
            <>
                {props.children}
            </>
        )
    }

}