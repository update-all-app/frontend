import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';

import {
  FACEBOOK,
  INSTAGRAM,
  GOOGLE_MAPS,
  APPLE_MAPS,
  TWITTER
} from '../constants';
export default function getIconFor(service) {
  switch (service) {
    case FACEBOOK.value:
      return <FaFacebookSquare className='text-4xl text-tertiary' />;
    case INSTAGRAM.value:
      return <FaInstagramSquare className='text-4xl text-tertiary' />;
    case GOOGLE_MAPS.value:
      return <FaGoogle className='text-4xl text-tertiary' />;
    case APPLE_MAPS.value:
      return <FaApple className='text-4xl text-tertiary' />;
    case TWITTER.value:
      return <FaTwitterSquare className='text-4xl text-tertiary' />;
    default:
      throw `Unknown Service type ${service}`;
  }
}
