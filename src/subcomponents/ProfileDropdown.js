import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../subcomponents/Avatar';
import { Menu, Transition } from '@headlessui/react';
import {
  PlusCircleIcon,
  CogIcon,
  LogoutIcon,
  ViewBoardsIcon
} from '@heroicons/react/outline';
import UserContext from '../context/UserContext';
import LoginManager from '../apiClients/LoginManager';
import { LOGOUT_USER } from '../actionTypes';
import { useHistory } from 'react-router-dom';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const MenuItem = ({ children, link, onClick }) => (
  <Menu.Item>
    {({ active }) =>
      link ? (
        <Link
          to={link}
          className={classNames(
            active ? 'bg-gray-100' : '',
            'block px-4 py-2 text-sm text-gray-700 flex items-center'
          )}
        >
          {children}
        </Link>
      ) : (
        <span
          onClick={onClick}
          className={classNames(
            active ? 'bg-gray-100' : '',
            'block px-4 py-2 text-sm text-gray-700 flex items-center cursor-pointer'
          )}
        >
          {children}
        </span>
      )
    }
  </Menu.Item>
);

export const ProfileDropdown = ({ initials }) => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  const logout = () => {
    LoginManager.clearLocalStorage();
    dispatch({ type: LOGOUT_USER });
    history.push('/');
  };

  return (
    <Menu as='div' className='ml-3 relative'>
      {({ open }) => (
        <>
          <div>
            <Menu.Button className='bg-terdark flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-terdark focus:ring-white'>
              <Avatar className='h-8 w-8 rounded-full' initials={initials} />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items
              static
              className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
            >
              <MenuItem link='/'>
                <ViewBoardsIcon className='h-6 w-6 mr-2' aria-hidden='true' />
                My Businesses
              </MenuItem>

              <MenuItem link='/businesses/new'>
                <PlusCircleIcon className='h-6 w-6 mr-2' aria-hidden='true' />
                New Business
              </MenuItem>

              <MenuItem link='/'>
                <CogIcon className='h-6 w-6 mr-2' aria-hidden='true' />
                Account Settings
              </MenuItem>

              <MenuItem onClick={logout}>
                <LogoutIcon className='h-6 w-6 mr-2' aria-hidden='true' />
                Sign out
              </MenuItem>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
