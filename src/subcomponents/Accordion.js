import React, {useState} from 'react'


export default function Accordion(props){

    const [isExpanded, setIsExpanded] = useState(false)

    const renderIcon = () => (
       isExpanded ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block float-right h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
       ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block float-right h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
       )
    )

    const renderChildren = () => (
        <div className={`${isExpanded ? 'max-h-full p-4 br-1' : 'max-h-0'} overflow-hidden px-4 bg-white rounded transition-max-height duration-500 ease-in-out`}>
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

    const renderButtonClassNames = () => {
        if(isExpanded){
            return "bg-gray-200 hover:bg-gray-300 mb-0"
        }else{
            return ""
        }
    }


    return(
        <div className={`w-full ${renderDivClassNames()}`}>
            <button 
                className={`${renderButtonClassNames()} focus:outline-none shadow-md cursor-pointer p-4 text-left border rounded w-full hover:bg-gray-100 transition duration-500`}
                onClick={() => setIsExpanded(prev => !prev)}    
             >
                <span>{props.headerText}</span>
                {renderIcon()}
             </button>
             {renderChildren()}
        </div>
    )

}