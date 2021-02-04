import React from 'react'
import { Redirect } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function WithAuth(props){

    const [loggedIn, loading] = useAuth()

    const renderModal = () => {
        if(loading){
            return(
                <>
                    <div className="overlay"></div>
                    <div className="loader">Loading...</div>
                </>
            )
        }
    }
    if(!loading && loggedIn){
        return(
            <Redirect to="/home" />
        )
    }else{
        return(
            <>  
                {renderModal()}
                {props.children}
            </>
        )
    }

}