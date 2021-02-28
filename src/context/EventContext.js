import React from 'react'

const EventContext = React.createContext({ regularEvents: [], irregularEvents: [] })
EventContext.displayName = "EventContext"

export default EventContext