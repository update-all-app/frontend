import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import InvalidPaymentBanner from '../subcomponents/InvalidPaymentBanner';
import { BusinessDropdown } from '../subcomponents/BusinessDropdown';
import { ProfileDropdown } from '../subcomponents/ProfileDropdown';
import { RefreshButton } from '../subcomponents/RefreshButton';
import {
  BrowserRouter as Router,
  useHistory,
  useRouteMatch,
  useLocation
} from 'react-router-dom';

export default function LoggedInNavbar(props) {
  const history = useHistory();
  const { state } = useContext(UserContext);

  const initials = state.data.name
    .split(' ')
    .map((n) => n[0])
    .join('');
  const hasAuthorizedServices =
    state.data.services && state.data.services.length > 0;

  const location = useLocation();

  const goToAuthorizeServices = () => {
    history.push('/authorize-services');
  };

  const renderPaymentBanner = () => {
    if (
      !state.data.paymentStatusCurrent &&
      location.pathname != '/setup-payment'
    ) {
      return <InvalidPaymentBanner />;
    }
  };

  const renderServiceAuthorizationNotifiation = () => {
    if (!hasAuthorizedServices) {
      return (
        <span className='flex h-3 w-3'>
          <span className='animate-ping absolute inline-flex rounded-full bg-red-400 h-3 w-3 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-full w-full bg-red-500 top-0 right-0'></span>
        </span>
      );
    }
  };

  return (
    <>
      <BusinessDropdown />
      <RefreshButton />
      <ProfileDropdown initials={initials} />

      {/* Todo: add back payment banner */}
      {/* {renderPaymentBanner()} */}
    </>
  );
}
