import React from 'react';

import { Title } from '../../subcomponents/Title';
import { Card } from '../../subcomponents/Card';

export default function About() {
  return (
    <>
      <Title text='About' />

      <Card>
        <p className='text-primary mb-5'>
          Tired of logging into 5 different websites to update your business
          hours? Do people show up when you're closed or not come when you're
          open because Google Maps isn't up to date or your Facebook business
          page is wrong?
        </p>
        <p className='text-primary mb-5'>
          That's where we come in. Update your company hours in one spot and
          have all of the social media companies that you use simultaneously
          sync! We are configured to work with all the major platforms,
          including Facebook, Twitter, Yelp, Google Maps, and Apple Maps
        </p>
        <p className='text-primary mb-5'>
          UpdateItAll is a small business founded by a unique mix of restaurant
          owners, submarine officers, and software experts, all committed to
          saving your small business time that you can use to focus on making
          money.
        </p>
      </Card>
    </>
  );
}
