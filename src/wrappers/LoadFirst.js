import React, { useContext } from 'react';

import UserContext from '../context/UserContext';

export default function LoadFirst(props) {
  const user = useContext(UserContext).state;

  if (user.loading) {
    return <></>;
  } else {
    return <>{props.children}</>;
  }
}
