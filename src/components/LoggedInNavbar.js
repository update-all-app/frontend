import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { LOGOUT_USER } from '../actionTypes'
import LoginManager from '../helpers/LoginManager'

export default function LoggedInNavbar(props){

    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)

    const goHome = () => {
        history.push("/home")
    }

    const goToLogout = () => {
        LoginManager.clearLocalStorage()
        dispatch({type: LOGOUT_USER})
        history.push("/")
    }

    return(
        <div className="landing-navbar">
            <div className="flex justify-center align-center">
                <button 
                className="bg-transparent text-black hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
                onClick={goHome}
                >
                    <span className="font-bold text-xl">UpdateItAll</span>
                </button>
            </div>
            <div className="flex justify-center align-center">
            <button 
            className="bg-transparent text-black hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
            onClick={goToLogout}
            >
                <span className="font-bold text-lg">Logout</span>
            </button>
            </div>
        </div>
    )
}

