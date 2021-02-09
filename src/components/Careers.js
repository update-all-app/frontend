import React from 'react'
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter'
import CareerCard from './CareerCard'

import { hash } from "../helpers/functions.js";

import jobOpenings from "../dummyData/jobOpenings"

export default function Careers(props) {
  return (
    <WithHeaderAndFooter>
      <div className="flex justify-center items-center w-full flex-col">
        <h1 className="text-center text-2xl font-bold m-10">
          Careers
        </h1>
        <div className="max-w-sm mx-auto flex-col p-6 bg-white rounded-lg shadow-lx">
          {jobOpenings.map(job => <CareerCard job={job} key={hash(job.title)} />)}
        </div>
      </div>
    </WithHeaderAndFooter>
  )
}