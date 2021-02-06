import React from 'react'
import ErrorText from './ErrorText'
import { hash } from '../helpers/functions'

export default function Submit(props){

    const {value, onClick, errors=[], mt=0} = props
    const renderErrors = () => {
        return (
        <div>
            {errors.map(e => {
                return(
                    <ErrorText value={e} key={hash(e)} />
                )
            })}
        </div>
        )
    }

    return (
        <>
            <button 
                className={`bg-tertiary transition duration-300 hover:bg-terdark text-white font-bold py-2 px-4 mt-${mt} rounded focus:outline-none`}
                onClick={onClick}
            >
                {value}
            </button>
            {renderErrors()}
        </>
    )

}