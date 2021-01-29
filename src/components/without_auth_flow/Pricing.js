import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'

export default function About(props){


    return(
        <div className="mt-0 h-full" >
            <div className="opacity-75 h-45pc w-full bg-secondary">
                <Navbar/>
                <img className="logo bounce-2" src={process.env.PUBLIC_URL + '/logo.png'} alt={"logo"}/>
            </div>
            <div className="white flex flex-col justify-center align-left h-1/2 p-8">
                <p className="text-primary text-left m-4">Tired of logging into 5 different websites to update your business hours? Do people show up when you're closed or not come when you're open because Google Maps isn't up to date or your Facebook business page is wrong?</p>
                <p className="text-primary text-left m-4">That's where we come in. Update your company hours in one spot and have all of the social media companies that you use simultaneously sync!</p>
                <p className="text-primary text-left m-4">UpdateItAll is a small business founded by a unique mix of restaurant owners, submarine officers, and software experts, all committed to saving your small business time that you can use to focus on making money.</p>
            </div>
            <Footer />
        </div>
    )
}

