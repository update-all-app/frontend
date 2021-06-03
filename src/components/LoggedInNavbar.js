import React, { useContext, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { LOGOUT_USER } from '../actionTypes'
import LoginManager from '../helpers/LoginManager'
import Avatar from '../subcomponents/Avatar'
import Dropdown from '../subcomponents/Dropdown'
import InvalidPaymentBanner from '../subcomponents/InvalidPaymentBanner'

export default function LoggedInNavbar(props){

    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)

    const [displayDropdown, setDisplayDropdown] = useState(false)

    const initials = state.data.name.split(" ").map(n => n[0]).join("")
    const hasAuthorizedServices = state.data.services && state.data.services.length > 0

    const location = useLocation()

    const goHome = () => {
        history.push("/")
    }

    const goToAuthorizeServices = () => {
        history.push("/authorize-services")
    }

    const renderPaymentBanner = () => {
        if(!state.data.paymentStatusCurrent && location.pathname != "/setup-payment"){
            return(
                <InvalidPaymentBanner />
            )
        }
    }

    const renderServiceAuthorizationNotifiation = () => {
        if(!hasAuthorizedServices){
            return(
                <span class="flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex rounded-full bg-red-400 h-3 w-3 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-full w-full bg-red-500 top-0 right-0"></span>
                </span>
            )
        }
    }

    const goToLogout = () => {
        setDisplayDropdown(false)
        LoginManager.clearLocalStorage()
        dispatch({type: LOGOUT_USER})
        history.push("/")
    }

    const goToNewBusiness = () => {
        setDisplayDropdown(false)
        history.push('/businesses/new')
    }

    const goToMyBusinesses = () => {
        setDisplayDropdown(false)
        history.push('/')
    }

    return(
        <>
        <div className="landing-navbar bg-terdark">
            <div className="flex justify-center align-center">
                <button 
                    className="ml-6 my-2 bg-transparent text-secondary hover:bg-transparent font-bold p-0.5 focus:outline-none rounded-full flex items-center justify-center border border-secondary rounded"
                    onClick={goHome}
                >
                    <img className="w-12 h-12" src={process.env.PUBLIC_URL + '/logo.png'} alt={"logo"}/>
                </button>
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="text-secdark mr-6 h-full flex items-center">
                    <div className="flex flex-column">
                        <button 
                            className="h-full focus:outline-none"
                            onClick={goToAuthorizeServices}
                        >
                            <svg className="w-8 h-8 inline pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                            </svg>
                            <p className="text-xs">Authorize</p><p className="text-xs">Services</p>
                        </button>
                        {renderServiceAuthorizationNotifiation()}
                    </div>
                </div>
                <div className="flex justify-center items-center mr-10">
                    <div className="relative inline-block text-left">
                        <button 
                            className="focus:outline-none" 
                            id="options-menu" 
                            aria-haspopup="true" 
                            aria-expanded="true"
                            onClick={() => setDisplayDropdown(!displayDropdown)}
                        >
                            <Avatar initials={initials}/>
                        </button>
                        <Dropdown 
                            hidden={!displayDropdown}
                            links={
                                {
                                    "My businesses": goToMyBusinesses,
                                    "Create New Business": goToNewBusiness,
                                    "Account Settings": () => {},
                                    "Manage Payment": () => {},
                                    "Logout": goToLogout
                                }
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
        {renderPaymentBanner()}
        </>
    )
}

