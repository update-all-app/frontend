import React from 'react'
import ErrorText from './ErrorText'
import { hash } from '../helpers/functions'

export default function Submit(props){

    const {value, onClick, type="primary", errors=[], mt=0} = props

    const bgColor = () => {
        switch(type){
            case "primary":
                return "tertiary"
            case "danger":
                return "red-500"
            default:
                return "tertiary"
        }
    }

    const bgHover = () => {
        switch(type){
            case "primary":
                return "terdark"
            case "danger":
                return "red-800"
            default:
                return "terdark"
        }
    }

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
                className={`bg-${bgColor()} transition duration-300 hover:bg-${bgHover()} text-white font-bold py-2 px-4 mt-${mt} rounded focus:outline-none`}
                onClick={onClick}
            >
                {value}
            </button>
            {renderErrors()}
        </>
    )

}