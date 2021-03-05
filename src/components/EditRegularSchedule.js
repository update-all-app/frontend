import React, {
  useEffect,
  useContext
} from 'react'
import Calendar from '../subcomponents/Calendar'
import EventContext from '../context/EventContext'
import { ADD_REGULAR_EVENT, DELETE_REGULAR_EVENT, EDIT_REGULAR_EVENT } from '../actionTypes'

export default function EditRegularSchedule(props){

  
  const {state, dispatch} = useContext(EventContext)
  const events = state.regularEvents

  const onSave = event => {
    const isNewEvent = !event.id
    
    if(isNewEvent){
      if(event.repeat && event.repeat !== "No Repeat"){
        const repeatEvents = getEventsForRepeat(event)
        for(let event of repeatEvents.additional){
          createNewEvent(event)
        }
      }else{
        createNewEvent({
          title: event.title,
          start: event.start,
          end: event.end
        })
      }
    }else{
      if(event.repeat && event.repeat !== "No Repeat"){
        const repeatEvents = getEventsForRepeat({...event})
        onDelete(event)
        for(let event of repeatEvents.additional){
          createNewEvent(event)
        }
      }else{
        const eventToSave = {
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end
        }
        updateEvent(eventToSave)
      }
      
    }
  }

  const getEventsForRepeat = (event) => {
    const everydayEvents = []
    const dayOfWeek = event.start.getDay()
    const dayOfMonth = event.start.getDate()
    const dayOfWeekToDate = weekDay => {
      return dayOfMonth - dayOfWeek + weekDay
    }
    if(event.end.getDate() !== dayOfMonth){
      return {
        original: event,
        additional: [event]
      }
    }
    switch(event.repeat){
      case "No Repeat":
        return {
          original: event,
          additional: [event]
        }
      case "Every Day":
        
        for(let i = 0; i < 7; i++){
          const newStart = new Date(event.start)
          newStart.setDate(dayOfWeekToDate(i))
          const newEnd = new Date(event.end)
          newEnd.setDate(dayOfWeekToDate(i))
          everydayEvents.push({
            title: event.title, 
            start: newStart,
            end: newEnd
          })
        }
        return {
          original: event,
          additional: everydayEvents
        }
      case "Every Weekday":
        
        for(let i = 1; i < 6; i++){
          const newStart = new Date(event.start)
          newStart.setDate(dayOfWeekToDate(i))
          const newEnd = new Date(event.end)
          newEnd.setDate(dayOfWeekToDate(i))
          everydayEvents.push({
            title: event.title, 
            start: newStart,
            end: newEnd
          })
        }
        return {
          original: event,
          additional: everydayEvents
        }
      default:
        return {
          original: event,
          additional: [event]
        }
    }
  }

  //TODO: Logic from this method to context
  const createNewEvent = event => {
    dispatch({type: ADD_REGULAR_EVENT, payload: event})
  }

  // TODO: Logic from this method to context
  const updateEvent = event => {
    dispatch({type: EDIT_REGULAR_EVENT, payload: event})
  }

  // TODO: Logic from this method to context
  const onDelete = event => {
    dispatch({type: DELETE_REGULAR_EVENT, payload: event})
  }

  useEffect(() => {
    const dayLabels = document.querySelectorAll(".rbc-header span")
    for(let dayLabel of dayLabels){
      const label = dayLabel.innerText
      const splitLabel = label.split(" ")
      const newLabel = splitLabel.length > 1 ? splitLabel[1] : splitLabel[0]
      dayLabel.innerText = newLabel
    }
  })


  return (
    <Calendar 
      allowedEventValues={["title","start", "end"]}
      disabledEventValues={["title"]}
      defaultView={"week"}
      views={["week"]}
      events={events}
      repeatOptions={["No Repeat", "Every Day", "Every Weekday"]}
      defaultEventValues={{
        title: "Open"
      }}
      onSave={onSave}
      onDelete={onDelete}
      toolbar={false}
    />
  )
}