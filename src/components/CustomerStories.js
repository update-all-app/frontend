import React from 'react'
import WithFooter from '../wrappers/WithFooter'
import Navbar from './Navbar'
import CustomerStoryCard from './CustomerStoryCard'
import { hash } from "../helpers/functions.js";

import customerStories from "../dummyData/customerStories"

export default function CustomerStories(props) {
  return (
    <WithFooter>
      <div className="h-12 bg-secondary flex justify-center w-full">
        <Navbar />
      </div>
      <div className="flex-col justify-center items-center w-full flex-col">
        <h1 className="text-center text-2xl font-bold m-10">
          Customer Stories
        </h1>
        <div className="m-4">
          {customerStories.map(story => <CustomerStoryCard story={story} key={hash(story.title)}/>)}
        </div>
      </div>
    </WithFooter>
  )
}