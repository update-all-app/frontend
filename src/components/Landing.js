import React from 'react'
import LandingNavbar from './LandingNavbar'
import { useHistory } from 'react-router-dom'

export default function Landing(props){

    const history = useHistory()

    const loginClick = () => {
        history.push("/login")
    }



    return(
        <div className="landing" >
            
            <div className="landing-top">
                <LandingNavbar/>
                <img className="logo bounce-2" src={process.env.PUBLIC_URL + '/logo.png'} alt={"logo"}/>
                <div className="landing-auth-buttons">
                <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 border border-green-600 hover:border-transparent rounded auth-button focus:outline-none">
                    Sign Up
                </button>
                    <button 
                    className="bg-transparent hover:bg-green-600 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded auth-button focus:outline-none"
                    onClick={loginClick}
                    >
                        Login
                    </button>
                </div>
                
            </div>
            <div className="landing-bottom">
                <p className="landing-text">UpdateItAll is a platform for small businesses like yours to update all of their information in one place.</p>
            </div>
            <img className="bg-img" src={process.env.PUBLIC_URL + '/bg-test.jpg'} alt=""/>
        </div>
    )
}