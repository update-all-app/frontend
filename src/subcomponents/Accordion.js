import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// TODO: update classNames to tailwind!
export default function Accordion(props) {
  const [checkboxId, setCheckboxId] = useState(uuidv4());

  const renderChildren = () => (
    <div className='tab-content'>{props.children}</div>
  );

  return (
    <div className='tabs'>
      <div className='tab'>
        <input
          type='checkbox'
          className='absolute opacity-0 z-0'
          id={checkboxId}
        />
        <label for={checkboxId} className='tab-label'>
          <span>{props.headerText}</span>
        </label>
        {renderChildren()}
      </div>
    </div>
  );
}
