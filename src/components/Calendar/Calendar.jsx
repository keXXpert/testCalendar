import React, { useState } from 'react'
import myCSS from './Calendar.module.css'
import Day from './Day/Day'
import Modal from '../Modal/Modal'

const months = [
    { label: 'January', days: 31 },
    { label: 'February', days: 29 },
    { label: 'March', days: 31 },
    { label: 'April', days: 30 },
    { label: 'May', days: 31 },
    { label: 'June', days: 30 },
    { label: 'July', days: 31 },
    { label: 'August', days: 31 },
    { label: 'September', days: 30 },
    { label: 'October', days: 31 },
    { label: 'November', days: 30 },
    { label: 'December', days: 31 }
]

const initialEevents = [
    { id: 1, name: 'Test event', startsDate: '2020-06-10', startsTime: '11:00', endsDate: '2020-06-10', endsTime: '12:00' }
]

const getDate = (date, time) => new Date((date + ' ' + time + ':00').replace(/-/g, "/"))

const getDaysArray = (length) => new Array(length).fill('')

const Calendar = () => {
    const currMonth = new Date().getMonth() + 1
    const [selectedMonth, setMonth] = useState(currMonth)
    const [selectedYear, setYear] = useState(2020)
    const [events, setEvents] = useState(initialEevents)
    const [isModalOpen, setModalOpen] = useState(false)
    const [editId, setEditId] = useState(null)
    const [newEventId, setNewEventId] = useState(2)

    const monthStartDay = new Date(`${selectedYear}-${selectedMonth}-01`).getDay();
    const currFullDate = new Date().toDateString()
    const daysInMonth = months[selectedMonth - 1].days


    const incrementMonth = () => {
        if (selectedMonth > 11) {
            setMonth(1)
            setYear(selectedYear + 1)
        } else {
            setMonth(selectedMonth + 1)
        }
    }

    const setToCurrent = () => {
        setYear(2020)
        setMonth(currMonth)
    }

    const decrementMonth = () => {
        if (selectedMonth < 2) {
            setMonth(12)
            setYear(selectedYear - 1)
        } else {
            setMonth(selectedMonth - 1)
        }
    }

    const handleNewEventData = (name, startsDate, startsTime, endsDate, endsTime) => {
        let evt ={ name, startsDate, startsTime, endsDate, endsTime }
        let evts = [...events]
        if (editId) {
            evt.id = editId
            evts = events.filter((event) => event.id !== editId)
        } else {
            evt.id = newEventId
        }

        evts.push(evt)
        evts.sort((a, b) => (getDate(a.startsDate, a.startsTime) - getDate(b.startsDate, b.startsTime)))
        setEvents(evts)
        setNewEventId(newEventId + 1)
        closeModal()
    }

    const deleteEvent = (id) => {
        let localEvents = events.filter((event) => event.id !== id)
        setEvents(localEvents)
        closeModal()
    }

    const closeModal = () => {
        setEditId(null)
        setModalOpen(false)
    }

    const handleEventClick = (id) => {
        setModalOpen(true)
        setEditId(id)
    }

    // filtering only upcoming events from all
    const upcomingEvents = events.filter((event) => getDate(event.startsDate, event.startsTime) > new Date())

    return (
        <div className={myCSS.Calendar}>
            {isModalOpen && !!editId && <Modal events={events} id={editId} handleNewEventData={handleNewEventData} deleteEvent={deleteEvent} closeModal={closeModal}/>}
            {isModalOpen && !editId && <Modal handleNewEventData={handleNewEventData} closeModal={closeModal}/>}
            <div className={myCSS.CalendarBorder}>
                <h1>Calendar</h1>
                <div className={myCSS.Month}>
                    <div style={{ marginRight: '10px' }}>
                        <div className={myCSS.Title} >
                            <span onClick={setToCurrent} style={{ cursor: 'pointer' }}>Current date: {currFullDate}</span>
                            <span>
                                <button onClick={decrementMonth}>{'<'}</button>
                                &nbsp;{months[selectedMonth - 1].label}, {selectedYear}&nbsp;
                                <button onClick={incrementMonth}>{'>'}</button>
                            </span>
                        </div>
                        <hr />
                        <div className={myCSS.Days}>
                            <div style={{ width: 130 * (monthStartDay - 1), display: 'inline-block' }}> </div>
                            {getDaysArray(daysInMonth).map((a, index) =>
                                <Day key={index} month={selectedMonth} year={selectedYear}
                                    day={index + 1}
                                    events={events}
                                    handleEventClick={handleEventClick}
                                />)}
                        </div>
                    </div>
                    <hr />
                    <div className={myCSS.Edit}>
                        <div>
                            Upcoming events
                            <hr />
                            <div className={myCSS.Events}>
                                {upcomingEvents.map((event, index) => (
                                    <div className={myCSS.Upcoming} key={index} onClick={() => { handleEventClick(event.id) }}><small><p>{event.startsDate}</p>{event.startsTime} - {event.name}</small></div>
                                ))}
                            </div>
                        </div>
                        <label><input type='checkbox' />Only upcoming 2 weeks</label>
                        <button className={myCSS.Button} onClick={() => {setModalOpen(true)}}>Create new event</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar