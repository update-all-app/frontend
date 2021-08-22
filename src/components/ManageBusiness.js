import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import EventContext from '../context/EventContext'
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter'
import Sidebar from '../subcomponents/Sidebar'
import EditRegularScheduleSimple from './EditRegularScheduleSimple'
import EditIrregularSchedule from './EditIrregularSchedule'
import UpdateIt from './UpdateIt'
import ViewBusinessCalendar from './ViewBusinessCalendar'
import ManageEndpoints from './ManageEndpoints'
import NotFound from './NotFound'
import EditBusiness from './EditBusiness'
import ErrorBanner from '../subcomponents/ErrorBanner'

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  useHistory,
  Link,
  useParams,
  useRouteMatch,
  Route
} from 'react-router-dom'

import BusinessApiManager from '../apiClients/BusinessApiManager'
import {
  capitalize,
  formatDateForFrontend
} from '../helpers/functions'

import {
  CLEAR_EVENTS,
  SET_REGULAR_EVENTS,
  SET_IRREGULAR_EVENTS
} from '../actionTypes'


export default function Home(props){

  const history = useHistory()

  const user = useContext(UserContext).state
  const { dispatch } = useContext(EventContext)
  const { id } = useParams()
  const business = !!user.data.businesses && user.data.businesses.find(b => Number.parseInt(b.id) === Number.parseInt(id))

  const [activeTab, setActiveTab] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)

  const { path, url } = useRouteMatch()



  useEffect(() => {

    async function getAndSaveEvents(){
      try{
        const regularEvents = await BusinessApiManager.getRegularEventsForLocation(business.locationIds[0])  
        const formattedRegularEvents = regularEvents.map(re => ({
          start: re.start_time,
          end: re.end_time,
          day: re.day_of_week,
          id: re.id
        }))
        const irregularEvents = await BusinessApiManager.getIrregularEventsForLocation(business.locationIds[0])
        const formattedIrregularEents = irregularEvents.map(ie => ({
          id: ie.id,
          title: capitalize(ie.status),
          start: formatDateForFrontend(ie.start_time),
          end: formatDateForFrontend(ie.end_time)
        }))

        dispatch({type: SET_REGULAR_EVENTS, payload: formattedRegularEvents})
        dispatch({type: SET_IRREGULAR_EVENTS, payload: formattedIrregularEents})
      }catch(err){
        setErrorMessage("There was a problem loading your data")
      }
    }
    
    getAndSaveEvents()

    return () => {
      dispatch({type: CLEAR_EVENTS})
    }
    
  }, [business])

  

  

  if(!business && !user.data.loading){
    return <Redirect to="/not-found" />
  }

  const links = [
    "Update It",
    "View Calendar",
    "Edit Regular Schedule",
    "Edit Specific Dates",
    "Manage Endpoints",
    "Edit This Business"
  ]

  const urlSuffixes = [
    'update',
    'summary-calendar',
    'regular-hours',
    'irregular-hours',
    'manage-services',
    'edit'
  ]



  const urlSegments = history.location.pathname.split("/")
  const currentSuffix = urlSegments[urlSegments.length - 1]
  const tabToSet = urlSuffixes.indexOf(currentSuffix)
  if(tabToSet >= 0 && tabToSet !== activeTab){ setActiveTab(tabToSet)}

  const callbacks = [
    () => {setActiveTab(0); history.push(`${url}/${urlSuffixes[0]}`)},
    () => {setActiveTab(1); history.push(`${url}/${urlSuffixes[1]}`)},
    () => {setActiveTab(2); history.push(`${url}/${urlSuffixes[2]}`)},
    () => {setActiveTab(3); history.push(`${url}/${urlSuffixes[3]}`)},
    () => {setActiveTab(4); history.push(`${url}/${urlSuffixes[4]}`)},
    () => {setActiveTab(5); history.push(`${url}/${urlSuffixes[5]}`)}
  ]

  if(user.data.businesses.length > 1){
    links.push("Go back")
    callbacks.push(() => {
      history.push('/')
    })
  }


  const renderBackIcon = () => {
    if(user.data.businesses.length > 1){
      return(
        <svg className="w-8 h-8 inline pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      )
    }
  }


  const renderErrorBanner = () => {
    if(errorMessage){
      return (
        <ErrorBanner
          message={errorMessage}
          onExit={() => setErrorMessage(null)}
        />
      )
    }else{
      return null
    }
  }

  return(
    <>
      <WithHeaderAndFooter>
        <div className="h-full min-h-full">
          <div className="bg-secondary w-full h-full">
          </div>
          <div className="inline-flex flex-row space-between w-full">
            <Sidebar 
              links={links}
              callbacks={callbacks}
              activeLink={activeTab}
              header={business.name}

            >
              <svg className="w-8 h-8 inline pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <svg className="w-8 h-8 inline pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <svg className="w-8 h-8 inline pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg className="w-8 h-8 inline pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <svg className="w-8 h-8 inline pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <svg className="w-8 h-8 inline pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {renderBackIcon()}
            </Sidebar>
            <div className="w-full">
            {renderErrorBanner()}
            <Switch>
              <Route exact path={`${url}/${urlSuffixes[0]}`}>
                <UpdateIt business={business} />
              </Route>
              <Route exact path={`${url}/${urlSuffixes[1]}`}>
                <ViewBusinessCalendar business={business} />
              </Route>
              <Route exact path={`${url}/${urlSuffixes[2]}`}>
                <EditRegularScheduleSimple business={business} />
              </Route>
              <Route exact path={`${url}/${urlSuffixes[3]}`}>
                <EditIrregularSchedule business={business} />
              </Route>
              <Route exact path={`${url}/${urlSuffixes[4]}`}>
                <ManageEndpoints business={business} />
              </Route>
              <Route exact path={`${url}/${urlSuffixes[5]}`}>
                <EditBusiness business={business} />
              </Route> 
              <Route path={`${url}`}>
                <NotFound/>
              </Route>
            </Switch>
            </div>
            
          </div>
        </div>
          
      </WithHeaderAndFooter>
    </>
  )
}
  
