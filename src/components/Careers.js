import React from 'react';

import jobOpenings from '../dummyData/jobOpenings';
import { Title } from '../subcomponents/Title';
import { Cards } from '../subcomponents/Cards';
import { Card } from '../subcomponents/Card';

export default function Careers() {
  return (
    <>
      <Title text='Careers' />

      <Cards>
        {jobOpenings.map((job) => (
          <Card small key={job.id}>
            <h2 className='font-bold text-xl mb-2'>{job.title}</h2>
          </Card>
        ))}
      </Cards>
    </>
  );
}
