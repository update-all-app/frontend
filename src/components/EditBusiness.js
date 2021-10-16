import React from 'react';
import Input from '../subcomponents/Input';
import Submit from '../subcomponents/Submit';
import Form from '../subcomponents/Form';

export default function EditBusiness(props) {
  const { business } = props;

  const {
    addressLine1,
    addressLine2,
    city,
    state,
    zipcode,
    country,
    name,
    emailAddress,
    phoneNumber,
    id
  } = business;

  return (
    <div className='p-4 m-auto w-3/4'>
      <Form onSubmit={() => {}}>
        <Input label='Business Name' value={name} />
        <div className='flex flex-row justify-between'>
          <Input label='Business Email' value={emailAddress} w='w-11/12' />
          <Input label='Phone Number' value={phoneNumber} w='w-11/12' />
        </div>
        <div className='flex flex-row justify-between'>
          <Input label='Street Number' value={addressLine1} w='w-11/12' />
          <Input label='Streen Name' value={addressLine2} w='w-11/12' />
        </div>
        <div className='flex flex-row justify-between'>
          <Input label='City' value={city} w='w-11/12' />
          <Input label='State' value={state} w='w-11/12' />
          <Input label='Zip Code' value={zipcode} w='w-11/12' />
        </div>

        <Input label='Country' value={country} w='w-1/2' />

        <Submit value='Save' />
      </Form>
    </div>
  );
}
