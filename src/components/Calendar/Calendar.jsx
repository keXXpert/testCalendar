import React, { useState } from 'react'
import myCSS from './Calendar.module.css'
import Day from './Day/Day'

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

const events = [
    {id: 1 , name: 'Test event', startsDate: '2020-06-10', startsTime: '11:00'}
]

const getDays = (days) => {
    let jsxDays = []
    for (let index = 0; index < days; index++) {
        jsxDays.push(<Day key={index} day={index + 1} />)
    }
    return jsxDays
}

const Calendar = ({ month }) => {
    const currMonth = new Date().getMonth() + 1
    const [selectedMonth, setMonth] = useState(currMonth)
    const [selectedYear, setYear] = useState(2020)

    const monthStartDay = new Date(`${selectedYear}-${selectedMonth}-01`).getDay();
    
    const incrementMonth = () => {
        if (selectedMonth > 11) {
            setMonth(1)
            setYear( selectedYear + 1)
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
            setYear( selectedYear - 1 )
        } else {
            setMonth(selectedMonth - 1)
        }    
    }
    const currDate = new Date()

    const daysInMonth = months[currMonth].days

    const currFullDate = new Date().toDateString()
    const currentDay = new Date().getDay()

    return (
        <div className={myCSS.Calendar}>
            <div className={myCSS.CalendarBorder}>
                <h1>Calendar</h1>

                <div className={myCSS.Month}>
                    <div style={{ marginRight: '10px' }}>
                        <div className={myCSS.Title} >
                            <span onClick={setToCurrent} style={{cursor: 'pointer'}}>Current date: {currFullDate}</span>
                            <span>
                                <button onClick={decrementMonth}>{'<'}</button>
                                &nbsp;{months[selectedMonth - 1].label}, {selectedYear}&nbsp;
                                <button onClick={incrementMonth}>{'>'}</button>
                            </span>
                        </div>
                        <hr />
                        <div className={myCSS.Days}>
                            <div style={{width: 130*(monthStartDay-1), display: 'inline-block'}}> </div>
                            {getDays(31)}
                        </div>
                    </div>
                    <hr />
                    <div className={myCSS.Edit}>
                        <div>
                            Upcoming Events
                            <hr />
                            <div className={myCSS.Events}></div>
                        </div>
                        <div className={myCSS.Create}>
                            Create reminder
                            <hr />
                            <form>
                                <p>Name:</p>
                                <input type='text' placeholder='Name' />
                                <div className={myCSS.start}>
                                    <p>Starts at:</p>
                                    <input type='date' onChange={(e)=> console.log(e.target.value)}/>
                                    <input type='time' onChange={(e)=> console.log(e.target.value)}/>
                                </div>
                                <div className={myCSS.end}>
                                    <p>Ends at:</p>
                                    <input type='date' />
                                    <input type='time' />
                                </div>
                                <div><button>Create</button></div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar