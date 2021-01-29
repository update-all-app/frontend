import React from 'react'


export default function ErrorText(props){

    const {value} = props

    return(
        <div>
            <span className="text-xs text-red-700" id="passwordHelp">{value}</span>
        </div>
        
    )
}

