import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import UserContext from '../../../context/UserContext';
import { LocalStorageMock } from '@react-mock/localstorage';

export function withRouter(children) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

export function withUserContext(children, state, dispatch) {
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export function withLocalStorage(children, items) {
  return <LocalStorageMock items={items}>{children}</LocalStorageMock>;
}
