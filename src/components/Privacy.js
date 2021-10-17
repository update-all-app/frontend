import React from 'react';
import { Card } from '../subcomponents/Card';
import { Title } from '../subcomponents/Title';

export default function CustomerStories(props) {
  return (
    <>
      <Title text='Privacy' />

      <Card>
        <p className='text-gray-700 text-base'>
          We do hereby solemnly swear to be private.
        </p>
      </Card>
    </>
  );
}
