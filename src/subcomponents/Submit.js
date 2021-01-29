import React from 'react'
import ErrorText from './ErrorText'
import { hash } from '../helpers/functions'

export default function Submit(props){

    const {value, onClick, errors=[]} = props
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
                className="bg-gray-500 transition duration-300 hover:bg-black text-white font-bold py-2 px-4 rounded"
                onClick={onClick}
            >
                {value}
            </button>
            {renderErrors()}
        </>
    )

}