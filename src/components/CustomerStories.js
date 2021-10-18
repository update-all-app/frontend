import React from 'react';

import customerStories from '../dummyData/customerStories';
import { Title } from '../subcomponents/Title';
import { Cards } from '../subcomponents/Cards';
import { Card } from '../subcomponents/Card';
import { FaUserCircle } from 'react-icons/fa';

export default function CustomerStories(props) {
  return (
    <>
      <Title text='Customer Stories' />

      <Cards>
        {customerStories.map((story) => (
          <Card small key={story.id}>
            <div className='flex flex-col justify-between leading-normal h-full'>
              <div>
                <h2 className='font-bold text-xl mb-2'>{story.title}</h2>
                <p className='text-gray-700 text-base'>{story.content}</p>
              </div>

              <div className='flex items-center mt-3'>
                <FaUserCircle className='w-10 h-10 rounded-full mr-4' />
                <div className='text-sm'>
                  <p className='text-gray-900 leading-none'>{story.userName}</p>
                  <p className='text-gray-600'>{story.location}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </Cards>
    </>
  );
}
