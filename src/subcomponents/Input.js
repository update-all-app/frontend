import React from 'react'
import { hash } from '../helpers/functions'
import ErrorText from './ErrorText'
import Label from './Label'
export default function Input(props){

    const { 
        placeholder, 
        value, 
        onChange, 
        type="text", 
        errors=[], 
        id=null, 
        onFocus= () => {}, 
        disabled=false, 
        required=true, 
        mb='mb-12',
        display='block', 
        w="w-full", 
        label=null
    } = props

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

    const renderLabel = () => {
        if(label === null){
            return 
        }else{
            return(
                <Label
                    forLabel={id}
                    value={label}
                />
            )
        }
    }

    return (
        <div className={`${mb} w-full ${display}`}>
            {renderLabel()}
            <input 
                id={id}
                className={`${w} custom-input h-10 px-3 transition duration-300 text-base text-gray-700 placeholder-gray-400 border-b-2 focus:border-primary focus:border-b-2 focus:outline-none`}
                type={type}
                placeholder={propOrEmptyString(placeholder)}
                value={propOrEmptyString(value)}
                onChange={ e => onChange(e.target.value)}
                required={required}
                onFocus={onFocus}
                disabled={disabled}
            />
            {renderErrors()}
        </div>
    )

}

