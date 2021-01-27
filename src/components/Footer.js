import React from 'react'


export default function Footer(props){


    return(
        <footer className="flex justify-center border-t-2 absolute bottom-0 w-full h-10">
            <div>
            <button 
            className="bg-transparent text-xs text-black hover:bg-transparent hover:text-secondary py-2 px-4 rounded-l focus:outline-none"
            onClick={() => {}}
            >
                <span className="bold-text">Contact Us</span>
            </button>
            <button 
            className="bg-transparent text-xs text-black hover:bg-transparent hover:text-secondary py-2 px-4 rounded-l focus:outline-none"
            onClick={() => {}}
            >
                <span className="bold-text">Customer Stories</span>
            </button>
            <button 
            className="bg-transparent text-xs text-black hover:bg-transparent hover:text-secondary py-2 px-4 rounded-l focus:outline-none"
            onClick={() => {}}
            >
                <span className="bold-text">Careers</span>
            </button>
            <button 
            className="bg-transparent text-xs text-black hover:bg-transparent hover:text-secondary py-2 px-4 rounded-l focus:outline-none"
            onClick={() => {}}
            >
                <span className="bold-text">Privacy</span>
            </button>
            </div>
        </footer>
    )
}
