import React, {
  useState
} from 'react'

import Calendar from '../subcomponents/Calendar'


export default function EditIrregularSchedule(props){

  const [events, setEvents] = useState([])

  const onSave = event => {
    const isNewEvent = !event.id
    if(isNewEvent){
      const id = events.length + 1
      event.id = id
      setEvents([
        ...events,
        event
      ])
    }else{
      setEvents(
        events.map(e => {
          return e.id === event.id ? event : e
        })
      )
    }
  }

  const onDelete = event => {
    setEvents(
      events.filter(e => {
        return e.id !== event.id
      })
    )
  }

  return(
    <Calendar 
      allowedEventValues={["title","start", "end"]}
      defaultView={"month"}
      views={["month", "week"]}
      events={events}
      defaultEventValues={{
        title: "Closed"
      }}
      onSave={onSave}
      onDelete={onDelete}
    />
  )
}
