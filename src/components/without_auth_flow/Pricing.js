import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '../../subcomponents/Card';
import { Title } from '../../subcomponents/Title';
import { Button } from '../../subcomponents/Button';

export default function Pricing(props) {
  const history = useHistory();

  return (
    <>
      <Title text='Pricing' />

      <Card>
        <p className='text-primary mb-5'>
          As of now, we provide one subscription package at $5/mo as an
          all-inclusive package.
        </p>
        <p className='text-primary mb-5'>
          With this subscription, you can manage an unlimited number of
          business, and sync their hours of operation with any of the 3rd party
          social media sites you use to promote it. This includes Yelp, Facebook
          groups, Google Maps, Apple Maps, and Twitter.
        </p>
        <p className='text-primary mb-5'>
          Payments are handled by Stripe, and at no point will any sensitive
          personal information be saved on our servers or transmitted without
          state-of-the-art encryption.
        </p>
        <Button
          onClick={() => {
            history.push('/signup');
          }}
        >
          Get Started
        </Button>
      </Card>
    </>
  );
}
