import React from 'react'

import ErrorText from './ErrorText'

export default function Input(props){

    const { placeholder, value, onChange, type="text", errors=[], required=true, mb=12 } = props

    const propOrEmptyString = (someProp) => {
        return !!someProp ? someProp : ""
    }

    const renderErrors = () => {
        return errors.map(e => {
            return(
                <ErrorText value={e} />
            )
        })
    }

    return (
        <div className={`mb-${mb} w-full`}>
            <input 
                className={`w-full h-10 px-3 transition duration-300 text-base text-gray-700 placeholder-gray-600 border-b-2 focus:border-secondary focus:border-b-4 rounded-lg focus:outline-none`}
                type={type}
                placeholder={propOrEmptyString(placeholder)}
                value={propOrEmptyString(value)}
                onChange={ e => onChange(e.target.value)}
                required={required}
            />
            {renderErrors()}
        </div>
    )
    
}

