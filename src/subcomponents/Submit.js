import React from 'react'


export default function Submit(props){

    const {value, onClick} = props

    return (
        <button 
            className="bg-gray-500 transition duration-300 hover:bg-black text-white font-bold py-2 px-4 rounded"
            onClick={onClick}
        >
        {value}
        </button>
    )

}