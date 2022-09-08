import React, { Component } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { connect } from 'react-redux'
import events, { fetchEvents } from '../store/events.js'

class DemoApp extends Component {
  componentDidMount(){
    this.props.fetchEvents()
  }
  handleSelect = (info) =>{
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter event name: ");
    if (eventNamePrompt) {
      this.setState(
        { 
          start,
          end,
          title: eventNamePrompt
        }
      )
    }
  }
  render() {
    const { events } = this.props;
    const { handleSelect } = this;
    return (
      <div>
        <FullCalendar 
          editable
          selectable
          events={events}
          select={ handleSelect }
          eventContent={renderEventContent} // custom render function
          plugins={[ dayGridPlugin, interactionPlugin ]} 
        />
      </div>
    )
  }
}

function renderEventContent(eventInfo) {
  console.log(eventInfo)
  return (
    <div>
      <i>{eventInfo.event.title}</i>
    </div>
  )
}


const mapState = state => {
  return {
    username: state.auth.username,
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  }
}

export default connect(mapState, mapDispatchToProps)(DemoApp)

// class DemoApp extends Component {

//   state = {
//     weekendsVisible: true,
//     currentEvents: []
//   }

//   render() {
//     const { username } = this.props 
//     return (
//       <div className='demo-app'>
//         {this.renderSidebar()}
//         <div className='demo-app-main'>
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             headerToolbar={{
//               left: 'prev,next today',
//               center: 'title',
//               right: 'dayGridMonth,timeGridWeek,timeGridDay'
//             }}
//             initialView='dayGridMonth'
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             weekends={this.state.weekendsVisible}
//             //initialEvents={} // alternatively, use the `events` setting to fetch from a feed
//             select={this.handleDateSelect}
//             //eventContent={renderEventContent} // custom render function
//             eventContent={username} // custom render function
//             eventClick={this.handleEventClick}
//             eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
//             /* you can update a remote database when these fire:
//             eventAdd={function(){}}
//             eventChange={function(){}}
//             eventRemove={function(){}}
//             */
//           />
//         </div>
//       </div>
//     )
//   }

//   renderSidebar() {
//     return (
//       <div className='demo-app-sidebar'>
//         <div className='demo-app-sidebar-section'>
//           <h2>Instructions</h2>
//           <ul>
//             <li>Select dates and you will be prompted to create a new event</li>
//             <li>Drag, drop, and resize events</li>
//             <li>Click an event to delete it</li>
//           </ul>
//         </div>
//         <div className='demo-app-sidebar-section'>
//           <label>
//             <input
//               type='checkbox'
//               checked={this.state.weekendsVisible}
//               onChange={this.handleWeekendsToggle}
//             ></input>
//             toggle weekends
//           </label>
//         </div>
//         <div className='demo-app-sidebar-section'>
//           <h2>All Events ({this.state.currentEvents.length})</h2>
//           <ul>
//             {this.state.currentEvents.map(renderSidebarEvent)}
//           </ul>
//         </div>
//       </div>
//     )
//   }

//   handleWeekendsToggle = () => {
//     this.setState({
//       weekendsVisible: !this.state.weekendsVisible
//     })
//   }

//   handleDateSelect = (selectInfo) => {
//     let title = prompt('Please enter a new title for your event')
//     let calendarApi = selectInfo.view.calendar

//     calendarApi.unselect() // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       })
//     }
//   }

//   handleEventClick = (clickInfo) => {
//     if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       clickInfo.event.remove()
//     }
//   }

//   handleEvents = (events) => {
//     this.setState({
//       currentEvents: events
//     })
//   }

// }

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   )
// }

// function renderSidebarEvent(event) {
//   return (
//     <li key={event.id}>
//       <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
//       <i>{event.title}</i>
//     </li>
//   )
// }

// let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

// function createEventId() {
//   return String(eventGuid++)
// }
