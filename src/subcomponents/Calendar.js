import React from "react"
import Submit from './Submit'
import Input from './Input'
import TextArea from './TextArea'
import Select from './Select'
import { 
  dateTo24Time,
  safeCallWithDefault,
  dateToHTMLString 
} from '../helpers/functions'
import {
  Calendar,
  Views,
  momentLocalizer
} from "react-big-calendar"
import WithModalToggle from '../wrappers/WithModalToggle'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'


const localizer = momentLocalizer(moment)

const DragAndDropCalendar = withDragAndDrop(Calendar)

class InteractiveCalendar extends React.Component {

  static defaultProps = {
    views: Object.keys(Views).map(k => Views[k]),
    defaultView: "week",
    allowedEventValues: [
      "title",
      "start",
      "end",
      "desc"
    ],
    defaultEventValues: {},
    disabledEventValues: [],
    modalw: "160",
    modalh: "120",
    onSave: () => {}, 
    onDelete: () => {},
    events: [],
    step: 30, 
    toolbar: true,
    dayLayoutAlgorithm: 'overlap',
    repeatOptions: []
  }


  constructor(props) {
    super(props);
    this.state = {
      displayDragItemInCell: true,
      displayEditEvent: false,
      eventToEdit: {
        id: null,
        title: '',
        start: null,
        end: null,
        desc: ''
      },
      newEventTitle: "",
      newEventStart: "",
      newEventEnd: "",
      isNewEvent: false
    }

    this.moveEvent = this.moveEvent.bind(this)
    this.handleSelectSlot = this.handleSelectSlot.bind(this)
    this.editEvent = this.editEvent.bind(this)
  }

  placeholderEvent(){
    return {
      id: null,
      title: '',
      start: null,
      end: null,
      desc: ''
    }
  }

  handleDragStart = event => {
    this.setState({ draggedEvent: {...event} })
  }

  dragFromOutsideItem = () => {
    return this.state.draggedEvent
  }

  resizeEvent = ({event, start, end}) => {
    event.start = new Date(start)
    event.end = new Date(end)
    this.props.onSave(event)
  }

  onDropFromOutside = ({ start, end, allDay }) => {
    const { draggedEvent } = this.state

    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay,
    }

    this.setState({ draggedEvent: null })
    this.moveEvent({ event, start, end })
  }

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    event.start = start
    event.end = end
    this.props.onSave(event)

  }

  handleSelectSlot = ({ start, end }) => {
    let defaultTitle
    if(this.props.defaultEventValues.title === undefined){
      defaultTitle = ""
    }else{
      defaultTitle = this.props.defaultEventValues.title
    }

    this.setState({
      eventToEdit: {
        start,
        end,
        title: defaultTitle
      },
      displayEditEvent: true,
      isNewEvent: true
    })
  }

  editEvent = (e) => {
    this.setState({
      displayEditEvent: true,
      eventToEdit: {...e},
      isNewEvent: false
    })
  }
  

  exitAndSaveEvent = () => {
    this.props.onSave(this.state.eventToEdit)
    this.setState({
      eventToEdit: this.placeholderEvent()
    })
    this.exitModal()
  }

  updateModalTitle = (val) => {
    this.setState({
      eventToEdit: {
        ...this.state.eventToEdit,
        title: val
      }
    })
  }

  updateModalStartTime = (val) => {
    const [hour, min] = val.split(":")
    const startDate = new Date(this.state.eventToEdit.start)
    startDate.setHours(Number.parseInt(hour))
    startDate.setMinutes(Number.parseInt(min))
    this.setState({
      eventToEdit: {
        ...this.state.eventToEdit,
        start: startDate
      }
    })
  }

  updateModalStartDate = (val) => {
    const [year, month, day] = val.split("-")
    const startDate = new Date(this.state.eventToEdit.start)
    startDate.setYear(year)
    startDate.setMonth(month - 1)
    startDate.setDate(day)
    this.setState({
      eventToEdit: {
        ...this.state.eventToEdit,
        start: startDate
      }
    })

  }

  updateModalEndTime = (val) => {
    const [hour, min] = val.split(":")
    const endDate = new Date(this.state.eventToEdit.end)
    endDate.setHours(Number.parseInt(hour))
    endDate.setMinutes(Number.parseInt(min))
    this.setState({
      eventToEdit: {
        ...this.state.eventToEdit,
        end: endDate
      }
    })
  }

  updateModalEndDate = (val) => {
    const [year, month, day] = val.split("-")
    const endDate = new Date(this.state.eventToEdit.end)
    endDate.setYear(year)
    endDate.setMonth(month - 1)
    endDate.setDate(day)
    this.setState({
      eventToEdit: {
        ...this.state.eventToEdit,
        end: endDate
      }
    })
  }

  updateModalDesc = (val) => {
    this.setState({
      eventToEdit: {
        ...this.state.eventToEdit,
        desc: val
      }
    })
  }

  updateModalRepeat = val => {
    this.setState({
      eventToEdit: {
        ...this.state.eventToEdit,
        repeat: val
      }
    })
  }

  renderEventTitle = () => {
    if(!this.props.allowedEventValues.includes("title")){
      return null
    }
    const disabled = this.props.disabledEventValues.includes("title")
    
    return( 
      <Input
        label="Event Name"
        value={this.state.eventToEdit.title}
        onChange={val => this.updateModalTitle(val)}
        disabled={disabled}
      />
    )
  }

  renderStartTimes(){
    if(!this.props.allowedEventValues.includes("start")){
      return null
    }
    const disabled = this.props.disabledEventValues.includes("start")

    return(
      <div className="flex flex-row space-between">
        <Input
          label="Start Date"
          type="date"
          value={safeCallWithDefault("", dateToHTMLString, this.state.eventToEdit.start)}
          onChange={this.updateModalStartDate}
          w="11/12"
          disabled={disabled}
        />
        <Input
          label="Start Time"
          type="time"
          value={safeCallWithDefault("", dateTo24Time, this.state.eventToEdit.start)}
          onChange={this.updateModalStartTime}
          w="11/12"
          disabled={disabled}
        />
      </div>
    )
  }

  renderEndTimes(){
    if(!this.props.allowedEventValues.includes("end")){
      return null
    }
    const disabled = this.props.disabledEventValues.includes("end")
    return(
      <div className="flex flex-row space-between">
        <Input
          label="End Date"
          type="date"
          value={safeCallWithDefault("", dateToHTMLString, this.state.eventToEdit.end)}
          onChange={this.updateModalEndDate}
          w="11/12"
          disabled={disabled}
        />
        <Input
          label="End Time"
          type="time"
          value={safeCallWithDefault("", dateTo24Time, this.state.eventToEdit.end)}
          onChange={this.updateModalEndTime}
          w="11/12"
          disabled={disabled}
        />
      </div>
    )
  }

  renderDescription(){
    if(!this.props.allowedEventValues.includes("desc")){
      return null
    }
    const disabled = this.props.disabledEventValues.includes("desc")
    return(
      <TextArea
        label="Description"
        value={this.state.eventToEdit.desc}
        onChange={val => this.updateModalDesc(val)}
        w={'full'}
        h={56}
        disabled={disabled}
      />  
    )
  }

  renderRepeatOptions(){
    if(this.props.repeatOptions.length > 0){
      return(
        <div className="w-1/2">
          <Select
            label={"Repeat Options"}
            name="repeatOptions"
            value={this.state.eventToEdit.repeat}
            options={this.props.repeatOptions}
            onChange={val => this.updateModalRepeat(val)}
          />
        </div>
      )
    }
  }

  renderDeleteEvent(){
    if(!this.state.isNewEvent){
      return (
        <div className="my-10 flex justify-left flex-row">
          <Submit 
            value="Delete Event"
            type="danger"
            onClick={() => this.deleteEvent()}
          />
        </div>
      )
    }else{
      return null
    }
    
  }

  deleteEvent = () => {
    this.props.onDelete(this.state.eventToEdit)
    this.exitModal()
  }


  renderModal(){
    return(
      <div>
        <div className="flex flex-col">
          <div>
            {this.renderEventTitle()}
            {this.renderStartTimes()}
            {this.renderEndTimes()}
            {this.renderDescription()}
            {this.renderRepeatOptions()}
          </div>
        </div>
        <div className="flex flex-row justify-between mt-10">
          <Submit 
            value="Cancel"
            onClick={() => this.exitModal()}
          />
          <div className="float-right">
            <Submit 
              value="Save"
              onClick={() => this.exitAndSaveEvent()}
            />
          </div>
        </div>
        {this.renderDeleteEvent()}
      </div>
    )
  }

  exitModal(){
    this.setState({
      eventToEdit: this.placeholderEvent(),
      displayEditEvent: false
    })
  }

  render() {
    return (
      <div className="h-full" >
        <WithModalToggle
          w={this.props.modalw}
          h={this.props.modalh}
          modal={this.renderModal()}
          on={this.state.displayEditEvent}
          onExit={() => {this.setState({displayEditEvent: false})}}
        >
          <DragAndDropCalendar
            selectable
            events={this.props.events}
            onEventDrop={this.moveEvent}
            resizable
            // onDragStart={console.log}
            onEventResize={this.resizeEvent}
            localizer={localizer}
            defaultView={this.props.defaultView}
            defaultDate={new Date(Date.now())}
            style={{ height: '100%',width: '95%'}}
            onSelectEvent={this.editEvent}
            onSelectSlot={this.handleSelectSlot}
            popup={true}
            step={this.props.step}
            views={this.props.views}
            dragFromOutsideItem={
              this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
            }
            onDropFromOutside={this.onDropFromOutside}
            handleDragStart={this.handleDragStart}
            toolbar={this.props.toolbar}
            dayLayoutAlgorithm={this.props.dayLayoutAlgorithm}
          />
          
        </WithModalToggle>
      </div>
    )
  }
}



export default InteractiveCalendar

