import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter'

import ApiManager from '../helpers/ApiManager'
import Parser from '../helpers/Parser'

import { useHistory, Redirect } from 'react-router-dom'
import BusinessCard from '../subcomponents/BusinessCard'


export default function SelectBusiness(props){

    const {state, dispatch} = useContext(UserContext)
    const user = state
    const history = useHistory()



    const renderBusinesses = () => {
        return user.data.businesses.map(b => (
            <BusinessCard
                business={b}
            />
        ))
    }

    if(!user.data.businesses|| user.loading){
        return <></>
    }else if(user.data.businesses.length === 0){
        console.log(user.data.businesses)
        return <Redirect to="/businesses/new" />
    }else if(user.data.businesses.length > 1){
        return (
            <WithHeaderAndFooter>
                <div className="w-full flex flex-wrap justify-left items-left p-14">
                    {renderBusinesses()}
                </div>
                
            </WithHeaderAndFooter>
        )
    }else{
        console.log(user.data.businesses)
        return <Redirect to={`/businesses/${user.data.businesses[0].id}`} />
    }
    
    
}

