import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import EventContext from '../context/EventContext';
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter';
import Sidebar from '../subcomponents/Sidebar';
import UpdateIt from './UpdateIt';
import ManageEndpoints from './ManageEndpoints';
import NotFound from './NotFound';
import EditBusiness from './EditBusiness';
import ErrorBanner from '../subcomponents/ErrorBanner';

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  useHistory,
  Link,
  useParams,
  useRouteMatch,
  Route
} from 'react-router-dom';

import BusinessApiManager from '../apiClients/BusinessApiManager';
import { capitalize, formatDateForFrontend } from '../helpers/functions';

import {
  CLEAR_EVENTS,
  SET_REGULAR_EVENTS,
  SET_IRREGULAR_EVENTS
} from '../actionTypes';
import { BusinessHours } from './BusinessHours';

export default function Home(props) {
  const history = useHistory();

  const user = useContext(UserContext).state;
  const { dispatch } = useContext(EventContext);
  const { id } = useParams();
  const business =
    !!user.data.businesses &&
    user.data.businesses.find(
      (b) => Number.parseInt(b.id) === Number.parseInt(id)
    );

  const [activeTab, setActiveTab] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const { path, url } = useRouteMatch();

  useEffect(() => {
    async function getAndSaveEvents() {
      try {
        const regularEvents = await BusinessApiManager.getRegularEventsForLocation(
          business.locationIds[0]
        );
        const formattedRegularEvents = regularEvents.map((re) => ({
          start: re.start_time,
          end: re.end_time,
          day: re.day_of_week,
          id: re.id
        }));
        const irregularEvents = await BusinessApiManager.getIrregularEventsForLocation(
          business.locationIds[0]
        );
        const formattedIrregularEents = irregularEvents.map((ie) => ({
          id: ie.id,
          title: capitalize(ie.status),
          start: formatDateForFrontend(ie.start_time),
          end: formatDateForFrontend(ie.end_time)
        }));

        dispatch({ type: SET_REGULAR_EVENTS, payload: formattedRegularEvents });
        dispatch({
          type: SET_IRREGULAR_EVENTS,
          payload: formattedIrregularEents
        });
      } catch (err) {
        setErrorMessage('There was a problem loading your data');
      }
    }

    getAndSaveEvents();

    return () => {
      dispatch({ type: CLEAR_EVENTS });
    };
  }, [business]);

  if (!business && !user.data.loading) {
    return <Redirect to='/not-found' />;
  }

  const links = [
    'Update It',
    'Manage Endpoints',
    'Edit This Business',
    'Business Hours'
  ];

  const urlSuffixes = ['update', 'manage-services', 'edit', 'business-hours'];

  const urlSegments = history.location.pathname.split('/');
  const currentSuffix = urlSegments[urlSegments.length - 1];
  const tabToSet = urlSuffixes.indexOf(currentSuffix);
  if (tabToSet >= 0 && tabToSet !== activeTab) {
    setActiveTab(tabToSet);
  }

  const callbacks = [
    () => {
      setActiveTab(0);
      history.push(`${url}/${urlSuffixes[0]}`);
    },
    () => {
      setActiveTab(1);
      history.push(`${url}/${urlSuffixes[1]}`);
    },
    () => {
      setActiveTab(2);
      history.push(`${url}/${urlSuffixes[2]}`);
    },
    () => {
      setActiveTab(3);
      history.push(`${url}/${urlSuffixes[3]}`);
    },
    () => {
      setActiveTab(4);
      history.push(`${url}/${urlSuffixes[4]}`);
    },
    () => {
      setActiveTab(5);
      history.push(`${url}/${urlSuffixes[5]}`);
    }
  ];

  if (user.data.businesses.length > 1) {
    links.push('Go back');
    history.push('/');
    callbacks.push(() => {
      history.push('/');
    });
  }

  const renderBackIcon = () => {
    if (user.data.businesses.length > 1) {
      return (
        <svg
          className='w-8 h-8 inline pr-2'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 19l-7-7m0 0l7-7m-7 7h18'
          />
        </svg>
      );
    }
  };

  const renderErrorBanner = () => {
    if (errorMessage) {
      return (
        <ErrorBanner
          message={errorMessage}
          onExit={() => setErrorMessage(null)}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <WithHeaderAndFooter>
        <Sidebar />

        <div className='container mx-auto py-10 px-10 overflow-scroll h-content-narrow md:h-content'>
          <div className='w-full lg:w-4/5'>
            {renderErrorBanner()}

            <Switch>
              <Route exact path={`${url}`}>
                <UpdateIt business={business} />
              </Route>
              <Route exact path={`${url}/connections`}>
                <ManageEndpoints business={business} />
              </Route>
              <Route exact path={`${url}/edit`}>
                <EditBusiness business={business} />
              </Route>
              <Route exact path={`${url}/business-hours`}>
                <BusinessHours business={business} />
              </Route>
              <Route path={`${url}`}>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </WithHeaderAndFooter>
    </>
  );
}
