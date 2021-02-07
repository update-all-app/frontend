import React, { useContext, useState } from 'react'
import UserContext from './../context/UserContext'
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter'
import Sidebar from '../subcomponents/Sidebar'
import { useHistory, Redirect } from 'react-router-dom'


export default function SelectBusiness(props){

    const user = useContext(UserContext).state
    const history = useHistory()

    const renderBusinesses = () => {
        return user.businesses.map(b => (
            <p>{`${b.name}`}</p>
        ))
    }

    if(!user.data.businesses || user.data.businesses.length === 0){
        console.log(user.data.businesses)
        return <Redirect to="/businesses/new" />
    }else if(user.data.businesses.length > 1){
        return (
            <WithHeaderAndFooter>
                {renderBusinesses()}
            </WithHeaderAndFooter>
        )
    }else{
        return <Redirect to={`/businesses/${user.data.businesses[0].id}`} />
    }
    
    
}

