import React, { useState } from 'react'
import myCSS from './Calendar.module.css'
import Day from './Day/Day'
import CreateForm from './CreateForm/CreateForm'

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
    { id: 1, name: 'Test event', startsDate: '2020-06-10', startsTime: '11:00', endsDate: '2020-06-10', endsTime: '12:00'}
]

const getDate = (date, time) => (date+' '+ time+':00').replace(/-/g,"/")

const getDaysArray = (length) => new Array(length).fill('')

const Calendar = () => {
    const currMonth = new Date().getMonth() + 1
    const [selectedMonth, setMonth] = useState(currMonth)
    const [selectedYear, setYear] = useState(2020)
    const [events, setEvents] = useState(initialEevents)

    console.log('Events render', events);

    const monthStartDay = new Date(`${selectedYear}-${selectedMonth}-01`).getDay();

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

    const addNewEvent = (name, startsDate, startsTime, endsDate, endsTime) => {
        const evt = [...events]
        evt.push({
            id: evt.length + 1,
            name, startsDate, startsTime, endsDate, endsTime
        })
        console.log(new Date(getDate(startsDate,startsTime)));
        
        evt.sort((a, b) => (new Date(getDate(a.startsDate,a.startsTime)) - new Date(getDate(b.startsDate, b.startsTime))))
        setEvents(evt)
    }

    const currDate = new Date()
    
    const daysInMonth = months[selectedMonth - 1].days

    const currFullDate = new Date().toDateString()
    const currentDay = new Date().getDay()

    return (
        <div className={myCSS.Calendar}>
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
                            {getDaysArray(daysInMonth).map((a, index) => <Day key={index} day={index + 1} />) } 
                        </div>
                    </div>
                    <hr />
                    <div className={myCSS.Edit}>
                        <div>
                            Upcoming events
                            <hr />
                            <div className={myCSS.Events}>
                                {events.map((event, index) => (
                                    <div className={myCSS.Upcoming} key={index}><small><p>{event.startsDate}</p>{event.startsTime} - {event.name}</small></div>
                                ))}
                            </div>
                        </div>
                        <CreateForm addNewEvent={addNewEvent}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar