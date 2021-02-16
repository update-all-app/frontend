import React from 'react'
import { hash } from '../helpers/functions'
import ErrorText from './ErrorText'
import Label from './Label'

export default function TextArea(props){

    const { value, onChange, errors=[], mb=12, id=null, label=null, w=160, h=96 } = props

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
        <div className={`mb-${mb} w-full`}>
            {renderLabel()}
            <textarea
                id={id}
                className={`w-${w} h-${h} px-3 transition duration-300 shadow-sm text-base text-gray-700 placeholder-gray-600 border-2 focus:border-secondary focus:border-b-4 rounded-lg focus:outline-none overflow-scroll resize-none`}
                value={propOrEmptyString(value)}
                onChange={e => onChange(e.target.value)}
            />
            {renderErrors()}
        </div>
    )
    
}

