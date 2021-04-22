import React, {useEffect, useState} from 'react'
import { businessCalendarData } from '../dummyData/businessCalendar'
import { DAYS } from '../helpers/Days'
import Button from '../subcomponents/Submit'
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

  useEffect(() => {
    const now = new Date()
    const weekStartDate = now.getDate() - now.getDay()
    const weekEndDate = weekStartDate + 6
    const weekStart = new Date(now.setDate(weekStartDate))
    const weekEnd = new Date(now.setDate(weekEndDate))
    setDateRangeStart(weekStart)
    setDateRangeEnd(weekEnd)
    setEvents(businessCalendarData)
    setLoading(false)
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
    return `${formatDateShort(dateRangeStart)} to ${formatDateShort(dateRangeEnd)}`
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
    return (
      <div className="m-12">
        <h1 className="text-xl tertiary mb-2 p-4 bg-secdark">{DAYS.GET(dayNumber).displayValue}, {displayDate} - {isClosed ? "Closed" : "Open"}</h1>
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
    <div className="m-12">
      <div className="mb-4">
        <Button
          value="This Week"
          onClick={getThisWeek}
        /> 
      </div>
      <Button 
        value="Prev"
        onClick={getPrevDateRange}
      />
        <span className="p-4 text-sm">{renderDateRange()}</span>
      <Button 
        value="Next"
        onClick={getNextDateRange} 
      />
      <div>
        <h1 className="text-3xl mb-0 mt-4 secdark p-2">{dateRangeStart.toLocaleString('default', {month: 'long'})}, {dateRangeStart.getFullYear()}</h1>
        {renderDays()}
      </div>
    </div>
  );
  
}