import React from 'react'
import WithFooter from '../wrappers/WithFooter'
import Navbar from './Navbar'

export default function CustomerStories(props) {
  return (
    <WithFooter>
      <div className="h-12 bg-secondary flex justify-center w-full">
        <Navbar />
      </div>
      <div className="flex justify-center items-center w-full flex-col">
        <h1 className="text-center text-2xl font-bold m-10">
          Privacy
        </h1>
        <div className="info-text white flex flex-col justify-center align-left h-1/2 p-8">
          <div className="border-l-2 border-primary shadow-sm">   
            <p className="text-primary text-left m-4">
              We do hereby solemnly swear to be private.
            </p>
          </div>
        </div>
      </div>
    </WithFooter>
  )
}