import React from 'react'


export default function LandingNavbar(props){


    return(
        <div className="landing-navbar">
            <div>
                <button className="bg-transparent hover:bg-transparent text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none">
                    UpdateItAll
                </button>
            </div>
            <div>
            <button className="bg-transparent hover:bg-transparent text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none">
                About
            </button>
            <button className="bg-transparent hover:bg-transparent text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none">
                Pricing
            </button>
            <button className="bg-transparent hover:bg-transparent text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none">
                Signup
            </button>
            <button className="bg-transparent hover:bg-transparent text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none">
                Login
            </button>
            </div>
        </div>
    )
}

