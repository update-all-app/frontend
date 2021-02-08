import React from 'react'
import Navbar from '../Navbar'
import WithFooter from '../../wrappers/WithFooter'

export default function About(props){


    return(
        <WithFooter>
            <div className="h-45vh w-full bg-secondary">
                <Navbar/>
                <img className="logo bounce-2 border-2 rounded-full border-gray-600" src={process.env.PUBLIC_URL + '/logo.png'} alt={"logo"}/>
            </div>
            <div className="info-text white flex flex-col justify-center align-left h-1/2 p-8 overflow-scroll">
                <div className="border-l-2 border-primary shadow-sm">   
                    <p className="text-primary text-left m-4">Tired of logging into 5 different websites to update your business hours? Do people show up when you're closed or not come when you're open because Google Maps isn't up to date or your Facebook business page is wrong?</p>
                    <p className="text-primary text-left m-4">That's where we come in. Update your company hours in one spot and have all of the social media companies that you use simultaneously sync! We are configured to work with all the major platforms, including Facebook, Twitter, Yelp, Google Maps, and Apple Maps</p>
                    <p className="text-primary text-left m-4">UpdateItAll is a small business founded by a unique mix of restaurant owners, submarine officers, and software experts, all committed to saving your small business time that you can use to focus on making money.</p>
                </div>
            </div>
        </WithFooter>
    )
}

