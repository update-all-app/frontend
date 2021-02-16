import React, {
  useEffect,
  useState
} from 'react'
import Calendar from '../subcomponents/Calendar'

export default function EditRegularSchedule(props){

  const [events, setEvents] = useState([])

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

  const createNewEvent = event => {
    
    setEvents(events => {
      const id = events.length + 1
      event.id = id
      event.start = new Date(event.start)
      event.end = new Date(event.end)
      return [
        ...events,
        {...event}
      ]
    
    })
  }

  const updateEvent = event => {
    setEvents(events => (
      events.map(e => {
        return e.id === event.id ? {...event} : e
      })
    ))
  }

  const onDelete = event => {
    setEvents(events => (
      events.filter(e => {
        return e.id !== event.id
      })
    ))
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

  console.log(events)

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
      modalh={200}
    />
  )
}