import React from 'react'
import Footer from '../components/Footer'



export default function WithFooter(props){

        return(
            <div className="page overflow-scroll">
                <div id="content-wrap">
                    {props.children}
                </div>
                <Footer />
            </div>
        )


}