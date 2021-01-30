import React from 'react'
import WithFooter from '../wrappers/WithFooter'
import Navbar from './Navbar'
import Input from '../subcomponents/Input'

export default function ContactUs(props){

    return(
        <WithFooter>
            <div className="h-12 bg-secondary flex justify-center w-full">
                <Navbar />
            </div>
            <div className="flex justify-center items-center w-full flex-col">
                <h1 className="text-center text-2xl font-bold m-10">
                    Ask a question or report a bug here!
                </h1>
                <div className="p-4 w-1/2">
                    <Input
                        placeholder={"Email"}
                        value={""}
                        onChange={() => {}}
                        errors={[]}
                    />
                </div>
            </div>
        </WithFooter>
    )
}