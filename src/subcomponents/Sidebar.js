import React from 'react';
import {
  HomeIcon,
  CalendarIcon,
  WifiIcon,
  CogIcon
} from '@heroicons/react/outline';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const SidebarLink = ({ children, link }) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const location = useLocation();
  const isActive = location.pathname.split(url).slice(-1)[0] === link;

  return (
    <li
      className={classNames(
        isActive ? 'text-yellow' : '',
        'flex w-full justify-between hover:text-gray-500 cursor-pointer items-center mb-6'
      )}
      onClick={() => history.push(`${url}${link}`)}
    >
      <div className='flex items-center'>{children}</div>
    </li>
  );
};

export default function Sidebar() {
  return (
    <>
      <div className='flex flex-col w-full md:w-52 text-white bg-primary flex-shrink-0 overflow-scroll md:h-content'>
        <div className='px-6'>
          <ul className='mt-6'>
            <SidebarLink link=''>
              <HomeIcon className='-mr-1 h-5 w-5' aria-hidden='true' />
              <span className='text-sm  ml-2'>Home</span>
            </SidebarLink>

            <SidebarLink link='/business-hours'>
              <CalendarIcon className='-mr-1 h-5 w-5' aria-hidden='true' />
              <span className='text-sm  ml-2'>Business Hours</span>
            </SidebarLink>

            <SidebarLink link='/connections'>
              <WifiIcon className='-mr-1 h-5 w-5' aria-hidden='true' />
              <span className='text-sm  ml-2'>Connections</span>
            </SidebarLink>

            <SidebarLink link='/edit'>
              <CogIcon className='-mr-1 h-5 w-5' aria-hidden='true' />
              <span className='text-sm  ml-2'>Business Settings</span>
            </SidebarLink>
          </ul>
        </div>
      </div>
    </>
  );
}
