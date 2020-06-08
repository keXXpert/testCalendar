import React, { useState } from 'react'
import myCSS from './CreateForm.module.css'

const CreateForm = ({addNewEvent, edit = false}) => {

    const [name, setName] = useState('')
    const [startsDate, setStartDate] = useState('2020-06-08')
    const [startsTime, setStartTime] = useState('10:00')
    const [endsDate, setEndDate] = useState('2020-06-08')
    const [endsTime, setEndTime] = useState('11:00')
    
    const submitEvent = () => {
        addNewEvent(name, startsDate, startsTime, endsDate, endsTime)
        setName('')
        setStartDate('2020-06-08')
        setStartTime('10:00')
        setEndDate('2020-06-08')
        setEndTime('11:00')
    }
 

    return (
        <div className={myCSS.Create}>
            {edit ? 'Edit event' : 'Create event'}
            <hr />
            <form onSubmit={(e)=> {e.preventDefault()}}>
                <p>Name:</p>
                <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                <div className={myCSS.start}>
                    <p>Starts at:</p>
                    <input type='date' value={startsDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type='time' value={startsTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div className={myCSS.end}>
                    <p>Ends at:</p>
                    <input type='date' value={endsDate} onChange={(e) => setEndDate(e.target.value)}/>
                    <input type='time' value={endsTime} onChange={(e) => setEndTime(e.target.value)}/>
                </div>
                <div><button onClick={submitEvent}>{edit? 'Edit':'Create'}</button></div>
            </form>
        </div>
    )
}

export default CreateForm