import React, {
  useContext,
  useState
} from 'react'

import Calendar from '../subcomponents/Calendar'
import EventContext from '../context/EventContext'
import ErrorBanner from '../subcomponents/ErrorBanner'
import InformationBanner from '../subcomponents/InformationBanner'
import { ADD_IRREGULAR_EVENT, DELETE_IRREGULAR_EVENT, EDIT_IRREGULAR_EVENT } from '../actionTypes'
import {
  dateRangesHaveSameDay,
  dateRangesOverlap,
  datesInSameDay
} from '../helpers/functions'

export default function EditIrregularSchedule(props){

  const {state, dispatch} = useContext(EventContext)
  const [error, setError] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  const events = state.irregularEvents

  const onSave = event => {
    const isNewEvent = !event.id
    const [isValid, message] = validateEvent(event)
    if(isValid){
      if(isNewEvent){
        dispatch({type: ADD_IRREGULAR_EVENT, payload: event})
      }else{
        dispatch({type: EDIT_IRREGULAR_EVENT, payload: event})
      }
    }else{
      setError(message)
    }
    
  }

  const onDelete = event => {
    dispatch({type: DELETE_IRREGULAR_EVENT, payload: event})
  }

  const validateEvent = event => {
    let message = ""

    if(event.title === "Closed"){
      if(event.start.getHours() !== 0 || event.start.getMinutes() !== 0 || event.end.getHours() !== 23 || event.end.getMinutes() !== 59){
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
      alert('here')
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
