import React from 'react'
import { useHistory } from 'react-router-dom'


export default function LandingNavbar(props){

    const history = useHistory()

    const goHome = () => {
        history.push("/")
    }

    const goToLogin = () => {
        history.push("/login")
    }

    const goToSignup = () => {
        history.push("/signup")
    }

    const goToAbout = () => {
        history.push("/about")
    }

    return(
        <div className="landing-navbar">
            <div>
                <button 
                className="bg-transparent text-black hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
                onClick={goHome}
                >
                    <span className="bold-text">UpdateItAll</span>
                </button>
            </div>
            <div>
            <button 
            className="bg-transparent text-black hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
            onClick={goToAbout}
            >
                <span className="bold-text">About</span>
            </button>
            <button 
            className="bg-transparent text-black hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
            onClick={() => {}}
            >
                <span className="bold-text">Pricing</span>
            </button>
            <button 
            className="bg-transparent text-black hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
            onClick={goToSignup}
            >
                <span className="bold-text">Signup</span>
            </button>
            <button 
            className="bg-transparent text-black hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
            onClick={goToLogin}
            >
                <span className="bold-text">Login</span>
            </button>
            </div>
        </div>
    )
}

