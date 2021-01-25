import React from 'react'


export default function ErrorText(props){

    const {value} = props

    return(
        <span class="text-xs text-red-700" id="passwordHelp">{value}</span>
    )
}

