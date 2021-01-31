import React from 'react'
import { hash } from '../helpers/functions'
import ErrorText from './ErrorText'

export default function TextArea(props){

    const { value, onChange, errors=[], mb=12, id=null } = props

    const propOrEmptyString = (someProp) => {
        return !!someProp ? someProp : ""
    }



    const renderErrors = () => {
        return errors.map(e => {
            return(
                <ErrorText value={e} key={hash(e)} />
            )
        })
    }

    return (
        <div className={`mb-${mb} w-full`}>
            <textarea
                id={id}
                className={`w-160 h-96 px-3 transition duration-300 shadow-sm text-base text-gray-700 placeholder-gray-600 border-2 focus:border-secondary focus:border-b-4 rounded-lg focus:outline-none overflow-scroll resize-none`}
                value={propOrEmptyString(value)}
                onChange={ e => onChange(e.target.value)}
            />
            {renderErrors()}
        </div>
    )
    
}

