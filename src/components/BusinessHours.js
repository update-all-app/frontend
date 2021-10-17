import React, { Fragment } from 'react';
import { Tabs } from '../subcomponents/Tabs';
import EditIrregularSchedule from './EditIrregularSchedule';
import EditRegularScheduleSimple from './EditRegularScheduleSimple';
import ViewBusinessCalendar from './ViewBusinessCalendar';
import { Tab } from '@headlessui/react';
import { Title } from '../subcomponents/Title';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const BusinessHours = ({ business }) => {
  const renderTab = (text) => (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={classNames(
            selected ? 'bg-tertiary text-white bg-opacity-75' : 'text-gray-500',
            'mx-2 hover:bg-tertiary rounded-md px-4 py-2 hover:bg-opacity-50 hover:text-white last:mr-0 first:ml-0 font-bold'
          )}
        >
          {text}
        </button>
      )}
    </Tab>
  );

  return (
    <div>
      <Title text='Business Hours' />
      <Tab.Group defaultIndex={0}>
        <Tab.List className='flex mb-8 mt-4'>
          {renderTab('Calendar')}
          {renderTab('Regular Schedule')}
          {renderTab('Specific Days')}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ViewBusinessCalendar business={business} />
          </Tab.Panel>
          <Tab.Panel>
            <EditRegularScheduleSimple business={business} />
          </Tab.Panel>
          <Tab.Panel>
            <EditIrregularSchedule business={business} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
