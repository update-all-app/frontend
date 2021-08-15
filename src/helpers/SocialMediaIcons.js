import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa'
import { 
    FACEBOOK,
    INSTAGRAM,
    GOOGLE_MAPS,
    APPLE_MAPS,
    TWITTER
} from "../constants";
export default function getIconFor(service){
    switch(service){
        case FACEBOOK.value:
            return (
                <FaFacebookSquare className="text-4xl" color="#3b5998"/>
            );
        case INSTAGRAM.value:
            return(
                <p>Instagram</p>
            );
        case GOOGLE_MAPS.value:
            return(
                <p>Google Maps</p>
            );
        case APPLE_MAPS.value:
            return(
                <p>Apple Maps</p>
            );
        case TWITTER.value:
            return(
                <p>Twitter</p>
            );
        default:
            throw `Unknown Service type ${service}`;
    };
}