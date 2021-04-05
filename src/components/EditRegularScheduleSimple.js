import React, {
    useState,
    useContext
  } from 'react'
  import {
      time24To12,
      time12To24
  } from '../helpers/functions'
  import OpenHoursForm from '../subcomponents/OpenHoursForm'
  import EventContext from '../context/EventContext'
  import ErrorBanner from '../subcomponents/ErrorBanner'
  import ApiManager from '../helpers/ApiManager'
  import { ADD_REGULAR_EVENT, DELETE_REGULAR_EVENT, EDIT_REGULAR_EVENT } from '../actionTypes'
  import { v4 as uuidv4} from 'uuid';

  export default function EditRegularScheduleSimple(props){
  
    const { business } = props
    const {state, dispatch} = useContext(EventContext)
    const events = state.regularEvents

    const [displayFormForDays, setDisplayFormForDays] = useState([false, false, false, false, false, false, false])
    const [errorMessage, setErrorMessage] = useState(null)

    const setDisplayFormForDaysToVal = (day, val) => {
        setDisplayFormForDays(prevState => {
            const newState = [...prevState]
            newState[day] = val
            return newState
        })
    }
  
    //TODO: Logic from this method to context
    const createNewEvent = async (event) => {
      const [validated, msg] = validateEvent(event)
      if(validated){
        const newId = uuidv4()
        const dispatchedEvent = {
          ...event,
          id: newId
        }
        dispatch({type: ADD_REGULAR_EVENT, payload: dispatchedEvent})
        try{
          const eventToSend = {
            day_of_week: event.day,
            start_time: event.start,
            end_time: event.end
          }
          const res = await ApiManager.createRegularEventForBusiness(business.id, eventToSend)
          dispatch({type: DELETE_REGULAR_EVENT, payload: dispatchedEvent})
          const newEvent = {
            id: res.id,
            start: res.start_time,
            end: res.end_time,
            day: res.day_of_week
          }
          dispatch({type: ADD_REGULAR_EVENT, payload: newEvent})
        }catch(err){
          dispatch({type: DELETE_REGULAR_EVENT, payload: dispatchedEvent})
          setErrorMessage("There was a problem saving your event. Please try again.")
        }
      }else{
        setErrorMessage(msg)
      }
      
    }
  
    // TODO: Logic from this method to context
    // const updateEvent = event => {
    //   dispatch({type: EDIT_REGULAR_EVENT, payload: event})
    // }
  
    // TODO: Logic from this method to context
    const onDelete = event => {
      dispatch({type: DELETE_REGULAR_EVENT, payload: event})
      try{
        const res = ApiManager.deleteRegularEvent(event.id)
      }catch(err){
        dispatch({type: ADD_REGULAR_EVENT, payload: event})
        setErrorMessage("There was a problem deleting your event. Please try again.")
      }
      
    }

    const eventsByDay = [[],[],[],[],[],[],[]]
    console.log(events)
    for(let event of events){
        const dayOfWeek = event.day
        eventsByDay[dayOfWeek].push(event)
    }

    for(let dayEvents of eventsByDay){
        dayEvents.sort((a,b) => {
            if(a > b) return 1
            if(a < b) return -1
            return 0
        })
    }


    const displayEvents = (events) => {
        return events.map(e => {
            return(
                <div className="p-1 bg-secondary w-1/3 flex flex-row items-center justify-between">
                    <span>{time24To12(e.start)} - {time24To12(e.end)}</span>
                    
                    <button
                        className="hover:text-tertiary focus:outline-none"
                        onClick={() => {onDelete(e)}}
                    >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )
        })
    }

    const dayStatuses = eventsByDay.map(e => e.length > 0 ? "Open" : "Closed")

    const displayButtonOrForm = (day) => {
        if(!displayFormForDays[day]){
            return (
                <button 
                    className="flex flex-row text-tertiary items-center shadow-sm border p-1 rounded-sm hover:bg-secondary transition duration-500 focus:outline-none"
                    onClick={() => setDisplayFormForDays(prevState => {
                        const newState = [...prevState]
                        newState[day] = true
                        return newState
                    })}    
                >
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>    
                    <p className="ml-2 text-xs">Add Open Hours</p>
                </button>
            )
        }else{
            return(
                <div className="w-120 mb-8 bg-secondary p-6 ml-8 shadow-lg">
                    <OpenHoursForm 
                        onSubmit={e => {
                            e.day = day
                            createNewEvent(e)
                            setDisplayFormForDaysToVal(day, false)
                        }}
                        onCancel={() => setDisplayFormForDaysToVal(day, false)}
                    />
                </div>
            )
        }
    }

    const milTimeToNum = (time) => {
      return Number.parseInt(time.split(":").join(""))
    }

    const validateEvent = (newEvent) => {
      let message = ""
      const newStart = milTimeToNum(newEvent.start)
      const newEnd = milTimeToNum(newEvent.end)
      if(newStart >= newEnd){
        message = "Events must start before they end"
        return [false, message]
      }
      const overlapValidation = eventsByDay[newEvent.day].filter(e => {
        const [eStart, eEnd] = [milTimeToNum(e.start), milTimeToNum(e.end)]
        const maxMins = Math.max(newStart, eStart)
        const minMaxs = Math.min(newEnd, eEnd)
        return minMaxs >= maxMins
      }).length === 0
      
      if(!overlapValidation){ 
        message = "Open hours cannot overlap"
      }

      return [overlapValidation, message]

    }

    const renderErrorBanner = () => {
      if(errorMessage){
        return(
          <ErrorBanner 
            message={errorMessage} 
            onExit={() => setErrorMessage(null)}
          />
        )
      }else{
        return null
      }
    }
    console.log(events)
    return (
      <>
        {renderErrorBanner()}
        <div className="flex m-4 ml-24 flex-col">
            <div className="mt-4">
              <h1><span className="my-3 float-left w-32 text-2xl">Sunday</span>
              <span className="my-4 ml-4 inline-flex justify-center px-2 text-tertiary text-lg rounded-sm font-bold">
                  {dayStatuses[0]}
              </span>
              </h1>
              <div>
                  {displayEvents(eventsByDay[0])}
                  <div className="m-4">
                      {displayButtonOrForm(0)}
                  </div>
              </div>
              <div>
                  
              </div>
            </div>
            <div className="mt-4">
              <h1><span className="my-3 float-left w-32 text-2xl">Monday</span>
              <span className="my-4 ml-4 inline-flex justify-center px-2 text-tertiary text-lg rounded-sm font-bold">
                  {dayStatuses[1]}
              </span>
              </h1>
              <div>
                  {displayEvents(eventsByDay[1])}
                  <div className="m-4">
                      {displayButtonOrForm(1)}
                  </div>
              </div>
              <div>
                  
              </div>
            </div>
            <div className="mt-4">
              <h1><span className="my-3 float-left w-32 text-2xl">Tuesday</span>
              <span className="my-4 ml-4 inline-flex justify-center px-2 w-16 text-tertiary text-lg rounded-sm font-bold">
                  {dayStatuses[2]}
              </span>
              </h1>
              <div>
                  {displayEvents(eventsByDay[2])}
                  <div className="m-4">
                      {displayButtonOrForm(2)}
                  </div>
              </div>
              <div>
                  
              </div>
            </div>
            <div className="mt-4">
              <h1><span className="my-3 float-left w-32 text-2xl">Wednesday</span>
              <span className="my-4 ml-4 inline-flex justify-center px-2 w-16 text-tertiary text-lg rounded-sm font-bold">
                  {dayStatuses[3]}
              </span>
              </h1>
              <div>
                  {displayEvents(eventsByDay[3])}
                  <div className="m-4">
                      {displayButtonOrForm(3)}
                  </div>
              </div>
              <div>
                  
              </div>
            </div>
            <div className="mt-4">
              <h1><span className="my-3 float-left w-32 text-2xl">Thursday</span>
              <span className="my-4 ml-4 inline-flex justify-center px-2 w-16 text-tertiary text-lg rounded-sm font-bold">
                  {dayStatuses[4]}
              </span>
              </h1>
              <div>
                  {displayEvents(eventsByDay[4])}
                  <div className="m-4">
                      {displayButtonOrForm(4)}
                  </div>
              </div>
              <div>
                  
              </div>
            </div>
            <div className="mt-4">
              <h1><span className="my-3 float-left w-32 text-2xl">Friday</span>
              <span className="my-4 ml-4 inline-flex justify-center px-2 w-16 text-tertiary text-lg rounded-sm font-bold">
                  {dayStatuses[5]}
              </span>
              </h1>
              <div>
                  {displayEvents(eventsByDay[5])}
                  <div className="m-4">
                      {displayButtonOrForm(5)}
                  </div>
              </div>
              <div>
                  
              </div>
            </div>
            <div className="mt-4">
              <h1><span className="my-3 float-left w-32 text-2xl">Saturday</span>
              <span className="my-4 ml-4 inline-flex justify-center px-2 w-16 text-tertiary text-lg rounded-sm font-bold">
                  {dayStatuses[6]}
              </span>
              </h1>
              <div>
                  {displayEvents(eventsByDay[6])}
                  <div className="m-4">
                      {displayButtonOrForm(6)}
                  </div>
              </div>
              <div>
                  
              </div>
            </div>
        </div>
      </>
    )
  }