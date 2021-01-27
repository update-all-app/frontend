import React from 'react'
import LandingNavbar from './LandingNavbar'
import Footer from './Footer'
import { useHistory } from 'react-router-dom'

export default function Landing(props){

    const history = useHistory()

    const loginClick = () => {
        history.push("/login")
    }

    const signupClick = () => {
        history.push("/signup")
    }

    return(
        <div className="landing" >
            <div className="landing-top">
                <LandingNavbar/>
                <img className="logo bounce-2" src={process.env.PUBLIC_URL + '/logo.png'} alt={"logo"}/>
                <div className="landing-auth-buttons">
                <button 
                    className="bg-primary hover:bg-black text-white font-bold py-2 px-4 border border-primary hover:border-transparent rounded auth-button focus:outline-none"
                    onClick={signupClick}
                >
                    Sign Up
                </button>
                    <button 
                    className="bg-transparent hover:bg-black text-white font-semibold py-2 px-4 border border-white hover:border-transparent rounded auth-button focus:outline-none"
                    onClick={loginClick}
                    >
                        Login
                    </button>
                </div>
                
            </div>
            <div className="landing-bottom">
                <p className="landing-text text-primary">UpdateItAll is a platform for small businesses like yours to update all of their information in one place.</p>
            </div>
            {/* <img className="bg-img" src={process.env.PUBLIC_URL + '/bg-test.jpg'} alt=""/> */}
            <Footer />
        </div>
    )
}