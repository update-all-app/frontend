import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const BusinessDropdown = () => {
  const businesses = ['Las Vegas', 'San Francisco', 'Los Angeles'];

  return (
    <Menu as='div' className='ml-3 relative'>
      {({ open }) => (
        <>
          <div>
            <Menu.Button className='bg-terdark flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-terdark focus:ring-white text-white rounded-full font-medium ml-3 flex ring-1 px-4 py-2 ring-white'>
              <span className='sr-only'>Open business select menu</span>
              Las Vegas
              <ChevronDownIcon
                className='-mr-1 ml-1 h-5 w-5'
                aria-hidden='true'
              />
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
              {businesses.map((business) => (
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href='#'
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {business}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
