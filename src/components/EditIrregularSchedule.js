import React, {
  useContext
} from 'react'

import Calendar from '../subcomponents/Calendar'
import EventContext from '../context/EventContext'
import { ADD_IRREGULAR_EVENT, DELETE_IRREGULAR_EVENT, EDIT_IRREGULAR_EVENT } from '../actionTypes'

export default function EditIrregularSchedule(props){

  const {state, dispatch} = useContext(EventContext)

  const events = state.irregularEvents

  const onSave = event => {
    const isNewEvent = !event.id
    if(isNewEvent){
      dispatch({type: ADD_IRREGULAR_EVENT, payload: event})
    }else{
      dispatch({type: EDIT_IRREGULAR_EVENT, payload: event})
    }
  }

  const onDelete = event => {
    dispatch({type: DELETE_IRREGULAR_EVENT, payload: event})
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
