import React, { useContext, useState } from 'react'
import UserContext from './../context/UserContext'
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter'
import Sidebar from '../subcomponents/Sidebar'
import { useHistory, Redirect } from 'react-router-dom'


export default function Home(props){

    const user = useContext(UserContext).state
    console.log(user.data)
    const history = useHistory()
    if(!user.data.businesses){
        console.log(user.data.businesses)
        return <Redirect to="/businesses/new" />
    }else{
        return(
            <WithHeaderAndFooter>
                <div>
                    <Sidebar 
                        links={[
                            "View Calendar",
                            "Update Recurring Schedule",
                            "Update Singular Schedule",
                            "Manage Update Locations",
                            "Edit This Business"
                        ]}
                    />
                </div>
                
            </WithHeaderAndFooter>
            
        )
    }
    
    
}

