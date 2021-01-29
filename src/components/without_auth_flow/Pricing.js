import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'

export default function Pricing(props){


    return(
        <div className="mt-0 h-full" >
            <div className="opacity-75 h-45pc w-full bg-secondary">
                <Navbar/>
                <img className="logo bounce-2" src={process.env.PUBLIC_URL + '/logo.png'} alt={"logo"}/>
            </div>
            <div className="white flex flex-col justify-center align-left h-1/2 p-8 overflow-scroll">
                <p className="text-primary text-left m-4">
                    As of now, we provide one subscription package at $5/mo as an all-inclusive package.
                </p>
                <p className="text-primary text-left m-4">
                    With this subscription, you can manage an unlimited number of business, and sync their 
                    hours of operation with any of the 3rd party social media sites you use to promote it. 
                    This includes Yelp, Facebook groups, Google Maps, Apple Maps, and Twitter.
                </p>
            </div>
            <Footer />
        </div>
    )
}

