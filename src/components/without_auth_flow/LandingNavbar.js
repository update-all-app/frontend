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

    const goToPricing = () => {
        history.push("/pricing")
    }

    return(
        <div className="landing-navbar bg-secondary">
            <div className="flex justify-center align-center">
                <button 
                className="bg-transparent text-black hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
                onClick={goHome}
                >
                    <span className="font-bold text-2xl">UpdateItAll</span>
                </button>
            </div>
            <div className="flex justify-center align-center">
            <button 
            className="bg-transparent text-black hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
            onClick={goToAbout}
            >
                <span className="font-bold text-lg">About</span>
            </button>
            <button 
            className="bg-transparent text-black hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
            onClick={goToPricing}
            >
                <span className="font-bold text-lg">Pricing</span>
            </button>
            <button 
            className="bg-transparent text-black hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
            onClick={goToSignup}
            >
                <span className="font-bold text-lg">Signup</span>
            </button>
            <button 
            className="bg-transparent text-black hover:bg-transparent font-bold py-2 px-4 rounded-l focus:outline-none"
            onClick={goToLogin}
            >
                <span className="font-bold text-lg">Login</span>
            </button>
            </div>
        </div>
    )
}

