import React from 'react'
import LandingNavbar from './LandingNavbar'
import Footer from './Footer'

export default function About(props){


    return(
        <div className="landing" >
            <div className="landing-top">
                <LandingNavbar/>
                <img className="logo bounce-2" src={process.env.PUBLIC_URL + '/logo.png'} alt={"logo"}/>
            </div>
            <div className="landing-bottom">
                <p className="text-primary text-left m-4">Tired of logging into 5 different websites to update your business hours? Do people show up when you're closed or not come when you're open because Google Maps isn't up to date or your Facebook business page is wrong?</p>
                <p className="text-primary text-left m-4">That's where we come in. Update your company hours in one spot and have all of the social media companies that you use simultaneously sync!</p>
                <p className="text-primary text-left m-4">UpdateItAll is a small business founded by a unique mix of restaurant owners, submarine officers, and software experts, all committed to saving your small business time that you can use to focus on making money.</p>
            </div>
            <Footer />
        </div>
    )
}

