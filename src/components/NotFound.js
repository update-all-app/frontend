import React, { useContext } from 'react';
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter';
import Submit from '../subcomponents/Submit';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';

export default function NotFound(props) {
  const history = useHistory();
  const loading = useContext(UserContext).state.data.loading;

  return loading ? (
    <WithHeaderAndFooter>
      <div className='flex h-full w-full flex-col justify-center items-center'>
        <h1 className='text-4xl my-10'>Oops! Can't find that page</h1>
        <Submit
          value='Go Home'
          onClick={() => {
            history.push('/');
          }}
        />
      </div>
    </WithHeaderAndFooter>
  ) : (
    <div className='page overflow-scroll'>
      <div id='content-wrap'>
        <div className='landing-navbar bg-terdark'>
          <div className='flex justify-center align-center'>
            <button
              className='ml-6 my-2 bg-transparent text-secondary hover:bg-transparent font-bold p-0.5 focus:outline-none rounded-full flex items-center justify-center border border-secondary rounded'
              onClick={() => history.push('/')}
            >
              <img
                className='w-12 h-12'
                src={process.env.PUBLIC_URL + '/logo.png'}
                alt={'logo'}
              />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
