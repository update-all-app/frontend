import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { LOGOUT_USER } from '../actionTypes'
import LoginManager from '../helpers/LoginManager'
import Avatar from '../subcomponents/Avatar'


export default function LoggedInNavbar(props){

    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)
    const initials = state.data.name.split(" ").map(n => n[0]).join("")
    const goHome = () => {
        history.push("/home")
    }

    const goToLogout = () => {
        LoginManager.clearLocalStorage()
        dispatch({type: LOGOUT_USER})
        history.push("/")
    }

    return(
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
            <div className="flex justify-center items-center">
                <button className="focus:outline-none">
                    <Avatar initials={initials}/>
                </button>
                <button 
                className="bg-transparent text-secondary hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
                onClick={goToLogout}
                >
                <span className="font-bold text-lg">Logout</span>
            </button>
            </div>
        </div>
    )
}

