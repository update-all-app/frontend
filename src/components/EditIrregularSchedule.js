import React, {
  useContext,
  useState
} from 'react'

import Calendar from '../subcomponents/Calendar'
import EventContext from '../context/EventContext'
import ErrorBanner from '../subcomponents/ErrorBanner'
import InformationBanner from '../subcomponents/InformationBanner'
import { ADD_IRREGULAR_EVENT, ADD_REGULAR_EVENT, DELETE_IRREGULAR_EVENT, EDIT_IRREGULAR_EVENT } from '../actionTypes'
import {
  dateRangesHaveSameDay,
  dateRangesOverlap,
  datesInSameDay,
  formatDateTimeForBackend,
  capitalize
} from '../helpers/functions'

import ApiManager from '../helpers/ApiManager'

import { v4 as uuidv4} from 'uuid';

export default function EditIrregularSchedule(props){

  const { business } = props

  const {state, dispatch} = useContext(EventContext)
  const [error, setError] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  const events = state.irregularEvents

  const onSave = async event => {
    const isNewEvent = !event.id
    const [isValid, message] = validateEvent(event)
    if(isValid){
      
      const formattedEvent = {
        status: event.title.toLowerCase(),
        start_time: formatDateTimeForBackend(event.start),
        end_time: formatDateTimeForBackend(event.end)
      }

      if(isNewEvent){
        const newId = uuidv4()
        const optimisticEvent = {...formattedEvent, id: newId}

        dispatch({type: ADD_IRREGULAR_EVENT, payload: optimisticEvent})
        try{
          const res = await ApiManager.createIrregularEventForLocation(business.locationIds[0], formattedEvent)
          dispatch({type: DELETE_IRREGULAR_EVENT, payload: optimisticEvent})
          res.forEach((data) => {
            const newEvent = {
              title: capitalize(data.status),
              start: new Date(data.start_time),
              end: new Date(data.end_time),
              id: data.id
            }
            dispatch({ type: ADD_IRREGULAR_EVENT, payload: newEvent })
          })
        }catch(err){
          dispatch({type: DELETE_IRREGULAR_EVENT, payload: optimisticEvent})
        }

      }else{
        const optimisticEvent = {...formattedEvent, id: event.id}
        const eventBeforeChange = events.find(e => e.id === event.id)
        dispatch({type: EDIT_IRREGULAR_EVENT, payload: optimisticEvent})
        try{
          const res = await ApiManager.updateIrregularEvent(optimisticEvent)
          const newEvent = {
            title: capitalize(res.status),
            start: new Date(res.start_time),
            end: new Date(res.end_time),
            id: res.id
          }
          dispatch({type: EDIT_IRREGULAR_EVENT, payload: newEvent})
        }catch(err){
          dispatch({type: EDIT_IRREGULAR_EVENT, payload: eventBeforeChange})
          setError('There was a problem updating your event. Please try again')
        }
      }
    }else{
      setError(message)
    }
    
  }

  const onDelete = async event => {
    dispatch({type: DELETE_IRREGULAR_EVENT, payload: event})
    try{
      await ApiManager.deleteIrregularEvent(event.id)
    }catch(err){
      dispatch({type: ADD_REGULAR_EVENT, payload: event})
      setError('There was a problem deleting your event. Please try again')
    }
  }

  const validateEvent = event => {
    let message = ""

    if(event.title === "Closed"){
      if(event.start.getHours() !== 0 || event.start.getMinutes() !== 0 || event.end.getHours() !== 23 || event.end.getMinutes() !== 59){
        event.start = new Date(event.start)
        event.start.setHours(0)
        event.start.setMinutes(0)
        event.end.setHours(23)
        event.end.setMinutes(59)
        setInfoMessage("Closed Events must be all day. We changed it for you!")
      }
    }

    if(event.start > event.end){
      message = "Event must start before it ends"
      return [false, message]
    }

    const rightNow = new Date(Date.now())

    if(event.end < rightNow){
      message = "Events must be in the future"
      return [false, message]
    }else if(event.start < rightNow && !datesInSameDay(event.start, rightNow)){
      message = "Events must be in the future"
      return [false, message]
    }

    const overlappingEvents = events.filter(e => {
      if(event.id && event.id === e.id){ return false }
      return dateRangesOverlap(event.start, event.end, e.start, e.end)
    })


    if(overlappingEvents.length > 0){
      message = "Events cannot overlap"
      return [false, message]
    }

    const eventsInSameDay = events.filter(e => {
      if(event.id && event.id === e.id){ return false }
      return dateRangesHaveSameDay(event.start, event.end, e.start, e.end)
    })

    if(event.title === "Closed"){
      if(eventsInSameDay.length > 0){
        message = "Closed events cannot have any other events in the same day."
        return [false, message]
      }
      
    }else{
      event.title = "Open"

      const closedEventsInSameDay = eventsInSameDay.filter(e => {
        return e.title === "Closed"
      })

      if(closedEventsInSameDay.length > 0){
        message = "Closed events cannot have any other events in the same day."
        return [false, message]
      }
    }
    return [true, ""]
  }

  const renderErrorBanner = () => {
    return error ? (
      <ErrorBanner 
        message={error} 
        onExit={() => setError(null)}
      />
    ) : null
  }

  const renderInfoBanner = () => {
    return infoMessage ? (
      <InformationBanner
        message={infoMessage}
        onExit={() => setInfoMessage(null)}
      />
    ) : null
  }

  return(
    <>
      {renderErrorBanner()}
      {renderInfoBanner()}
      <Calendar 
        allowedEventValues={["title","start", "end"]}
        defaultView={"month"}
        views={["month", "week"]}
        events={events}
        titleOptions={["Open", "Closed"]}
        onSave={onSave}
        onDelete={onDelete}
      />
    </>
  )
}
