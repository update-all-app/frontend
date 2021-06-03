import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function Accordion(props){

    const [isExpanded, setIsExpanded] = useState(false)
    const [checkboxId, setCheckboxId] = useState(uuidv4())

    // const renderIcon = () => (
    //    isExpanded ? (
    //     <svg xmlns="http://www.w3.org/2000/svg" className="inline-block float-right h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    //     </svg>
    //    ) : (
    //     <svg xmlns="http://www.w3.org/2000/svg" className="inline-block float-right h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    //     </svg>
    //    )
    // )

    const renderChildren = () => (
        <div className={`tab-content ${isExpanded ? 'max-h-screen p-4' : 'max-h-0'}`}>
            {props.children}
        </div>
    )

    const renderDivClassNames = () => {
        if(isExpanded){
            return "ml-2 mb-0"
        }else{
            return "m-2"
        }
    }

    // const renderButtonClassNames = () => {
    //     if(isExpanded){
    //         return "bg-gray-200 hover:bg-gray-300 mb-0"
    //     }else{
    //         return ""
    //     }
    // }

    return(
        <div className="tabs">
            <div className="tab">
                <input 
                    type="checkbox" 
                    className="absolute opacity-0 z-0"
                    id={checkboxId}
                />
                <label 
                    for={checkboxId} 
                    className="tab-label"
                >
                    <span>{props.headerText}</span>
                </label>
                {renderChildren()}
            </div>
        </div>
    )

}