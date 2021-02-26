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
    const location = useLocation()

    const goHome = () => {
        history.push("/")
    }

    const renderPaymentBanner = () => {
        if(!state.data.paymentStatusCurrent && location.pathname != "/setup-payment"){
            return(
                <InvalidPaymentBanner />
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

    return(
        <>
        <div className="landing-navbar bg-terdark">
            <div className="flex justify-center align-center">
                <button 
                className="ml-6 my-2 bg-transparent text-secondary hover:bg-transparent font-bold p-0.5 focus:outline-none rounded-full flex items-center justify-center border border-secondary rounded"
                onClick={goHome}
                >
                    <img className="w-12 h-12" src={process.env.PUBLIC_URL + '/logo.png'} alt={"logo"}/>
                    {/* <span className="font-bold text-xl">UpdateItAll</span> */}
                </button>
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
        {renderPaymentBanner()}
        </>
    )
}

