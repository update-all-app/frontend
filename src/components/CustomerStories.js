import React from 'react';
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter';
import CustomerStoryCard from './CustomerStoryCard';
import { hash } from '../helpers/functions.js';

import customerStories from '../dummyData/customerStories';

export default function CustomerStories(props) {
  return (
    <WithHeaderAndFooter>
      <div className='flex-col justify-center items-center w-full flex-col'>
        <h1 className='text-center text-2xl font-bold m-10'>
          Customer Stories
        </h1>
        <div className='m-4'>
          {customerStories.map((story) => (
            <CustomerStoryCard story={story} key={hash(story.title)} />
          ))}
        </div>
      </div>
    </WithHeaderAndFooter>
  );
}
