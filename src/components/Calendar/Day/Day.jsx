import React from 'react'
import myCSS from './Day.module.css'

const Day = ({ day, month, year, handleEventClick, events }) => {
    let localDay
    let localMonth
    if (day.toString().length === 1) localDay = '0' + day.toString()
    else localDay = day
    if (month.toString().length === 1) localMonth = '0' + month.toString()
    else localMonth = month


    const date = `${year}-${localMonth}-${localDay}`
    const todayEvents = events.filter( (event) => event.startsDate === date)
        
    return (
        <div className={myCSS.Day}>
            <strong>{day}</strong>
            <hr />
            {todayEvents.map((event, index) => 
                <div className={myCSS.Upcoming} key={index}>
                    <small>{event.startsTime} - {event.name}</small>
                </div>)}
        </div>
    )
}

export default Day