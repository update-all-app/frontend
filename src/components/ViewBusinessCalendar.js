import React, {useEffect, useState} from 'react'
import { businessCalendarData } from '../dummyData/businessCalendar'
import { DAYS } from '../helpers/Days'
import Button from '../subcomponents/Submit'
import Card from '../wrappers/Card'
import ApiManager from '../helpers/ApiManager'
import { dateToHTMLString } from '../helpers/functions'

import {
  formatDateShort,
  time24To12,
  datePlusDays
} from '../helpers/functions'

export default function ViewBusinessCalendar(props){

  const [events, setEvents] = useState([])
  const [dateRangeStart, setDateRangeStart] = useState(null)
  const [dateRangeEnd, setDateRangeEnd] = useState(null)
  const [loading, setLoading] = useState(true)
  console.log(props.business)
  useEffect(() => {
    const getSchedule = async (startDate, endDate) => {
      setLoading(true)
      const res = await ApiManager.getHoursSummary(props.business.locationIds[0], startDate, endDate)
      console.log(res)
      setEvents(res)
      setLoading(false)
    }
    const now = new Date()
    const weekStartDate = now.getDate() - now.getDay()
    const weekEndDate = weekStartDate + 6
    const weekStart = new Date(now.setDate(weekStartDate))
    const weekEnd = new Date(now.setDate(weekEndDate))
    setDateRangeStart(weekStart)
    setDateRangeEnd(weekEnd)
    getSchedule(dateToHTMLString(weekStart), dateToHTMLString(weekEnd))
  }, [])  


  const getThisWeek = () => {
    const now = new Date()
    const weekStartDate = now.getDate() - now.getDay()
    const weekEndDate = weekStartDate + 6
    const weekStart = new Date(now.setDate(weekStartDate))
    const weekEnd = new Date(now.setDate(weekEndDate))
    setLoading(true)
    setDateRangeStart(weekStart)
    setDateRangeEnd(weekEnd)
    setLoading(false)
  }

  const getPrevDateRange = () => {
    const newDateRangeEnd = datePlusDays(dateRangeEnd, -7)
    const newDateRangeStart = datePlusDays(dateRangeStart, -7) 
    setLoading(true)
    setDateRangeStart(newDateRangeStart)
    setDateRangeEnd(newDateRangeEnd)
    setLoading(false)
  }

  const getNextDateRange = () => {
    const newDateRangeStart = datePlusDays(dateRangeStart, 7)
    const newDateRangeEnd = datePlusDays(dateRangeEnd, 7)
    setLoading(true)
    setDateRangeStart(newDateRangeStart)
    setDateRangeEnd(newDateRangeEnd)
    setLoading(false)
  }

  const assignEventsToDay = () => {
    const eventsByDay = Array.from({length: 7}, () => [])
    for(let event of events){
      const dayFromStart = event.days_after_start
      const weekdayNumber = getDayOfWeekFromStartDate(dayFromStart)
      eventsByDay[weekdayNumber].push(event)
    }
    return eventsByDay
  }

  const getDaysFromStartFromDayOfWeek = dayOfWeek => {
    const dayOfWeekOfStartDate = dateRangeStart.getDay()
    return (dayOfWeek - dayOfWeekOfStartDate) % 7
  }

  const getDayOfWeekFromStartDate = dayFromStart => {
    const dayOfWeekOfStartDate = dateRangeStart.getDay()
    return (dayOfWeekOfStartDate + dayFromStart) % 7
  }

  const renderDateRange = () => {
    return (
      <>
        <span className="font-bold">{formatDateShort(dateRangeStart)}</span> to <span className="font-bold">{formatDateShort(dateRangeEnd)}</span>
      </>
    )
  }

  const displayEvents = dayEvents => {
    return dayEvents.map(e => (
      <div className="mb-2">
        <p className="p-1 bg-gray-100 inline-block w-1/2">{`${time24To12(e.start_time)} - ${time24To12(e.end_time)}`}</p>
      </div>
    ))
  }

  const renderDay = dayNumber => {
    const dayEvents = eventsByDay[dayNumber]
    const isClosed = dayEvents.length === 0
    const currentDate = datePlusDays(dateRangeStart, getDaysFromStartFromDayOfWeek(dayNumber)) 
    const displayDate = currentDate.getDate()
    
    return(
      <div className="m-8">
        <h1 className="rounded text-xl tertiary mb-2 p-4 bg-secdark">{DAYS.GET(dayNumber).displayValue}, {displayDate} - {isClosed ? "Closed" : "Open"}</h1>
        {displayEvents(dayEvents)}
      </div>
    )

  }

  const renderDays = () => {
    const startDay = dateRangeStart.getDay()
    const days = []
    for(let i = startDay; i < (startDay + 7); i++){
      const dayOfWeek = i % 7
      days.push(renderDay(dayOfWeek))
    }
    return days
  }

  let eventsByDay = null
  
  if(!loading){
    eventsByDay = assignEventsToDay() 
  }

  return loading ? (
    <h1>Loading...</h1>
  )
  : (
    <div className="m-8">
      <div className="border-b-2 p-2">
        <button
          className="focus:outline-none mr-4 bg-transparent hover:bg-gray-100 text-gray-800 font-thin py-1 px-3 border border-gray-500 rounded"
          onClick={getThisWeek}
        >
          Today
        </button> 
        <button 
          className="align-bottom focus:outline-none mt-2 text-center h-8 w-8 bg-transparent hover:bg-gray-100 text-gray-800 font-semibold hover:text-black pl-1 rounded-full"
          onClick={getPrevDateRange}
        >
          <svg className="relative" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg> 
        </button>
          <span className="align-text-bottom p-2 text-sm mb-2 align-middle"></span>
        <button 
          className="align-bottom focus:outline-none mt-2 text-center h-8 w-8 bg-transparent hover:bg-gray-100 text-gray-800 font-semibold hover:text-black pl-1 rounded-full"
          onClick={getNextDateRange} 
        >
          <svg className="relative" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <h1 className="pl-4 pt-4 align-bottom leading-3 inline-block text-3xl mb-0 mt-4 secdark p-2">{dateRangeStart.toLocaleString('default', {month: 'long'})}, {dateRangeStart.getFullYear()}</h1>
        <span className="text-xs ml-8 align-bottom">{renderDateRange()}</span>
        <div className="inline-block align-bottom hover:text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div>
        {renderDays()}
      </div>
    </div>
  );
  
}