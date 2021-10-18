import React, { useState } from 'react';
import Form from './Form';
import Input from './Input';
import Label from './Label';
import Submit from './Submit';

export default function OpenHoursForm(props) {
  const { initialStart = null, initialEnd = null } = props;

  const [openStart, setOpenStart] = useState(null);
  const [openEnd, setOpenEnd] = useState(null);

  const start = openStart ? openStart : initialStart;
  const end = openEnd ? initialEnd : openEnd;

  const createAndSubmitEvent = () => {
    const event = {
      start: openStart,
      end: openEnd
    };
    return props.onSubmit(event);
  };

  return (
    <Form onSubmit={createAndSubmitEvent}>
      <div className='w-3/4'>
        <Label htmlFor='open-start' value='Open at' />
        <Input
          id='open-start'
          type='time'
          onChange={setOpenStart}
          value={openStart}
        />
        <Label htmlFor='open-end' value='Closes at' />
        <Input
          id='open-end'
          type='time'
          onChange={setOpenEnd}
          value={openEnd}
        />
      </div>

      <div className='flex flex-row justify-between w-full'>
        <Submit value='Save Hours' />
        <div className='float-right'>
          <Submit
            value='Cancel'
            type='danger'
            btnType='button'
            onClick={props.onCancel}
          />
        </div>
      </div>
    </Form>
  );
}
