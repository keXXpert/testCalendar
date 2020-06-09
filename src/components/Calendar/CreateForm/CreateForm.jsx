import React, { useState } from 'react'
import myCSS from './CreateForm.module.css'



const CreateForm = ({handleNewEventData, edit = false, event, closeModal}) => {
    let initialName = ''
    let initialStartDate = '2020-06-09'
    let initialEndDate = '2020-06-09'
    let initialStartTime = '10:00'
    let initialEndTime = '11:11'
    if (edit) {
        initialName = event.name
        initialStartDate = event.startsDate
        initialEndDate = event.endsDate
        initialStartTime = event.startsTime
        initialEndTime = event.endsTime
    }

    const [name, setName] = useState(initialName)
    const [startsDate, setStartDate] = useState(initialStartDate)
    const [startsTime, setStartTime] = useState(initialStartTime)
    const [endsDate, setEndDate] = useState(initialEndDate)
    const [endsTime, setEndTime] = useState(initialEndTime)
    
    const submitEvent = () => {
        handleNewEventData(name, startsDate, startsTime, endsDate, endsTime)
        // setName('')
        // setStartDate('2020-06-08')
        // setStartTime('10:00')
        // setEndDate('2020-06-08')
        // setEndTime('11:00')
    }
 

    return (
        <div className={myCSS.Create}>
            <hr />
            <form onSubmit={(e)=> {e.preventDefault()}}>
                <p>Name:&nbsp;
                <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/></p>
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
                <div><button type="button" onClick={submitEvent}>{edit? 'Edit':'Create'}</button><button type="button" onClick={closeModal}>Cancel</button></div>
            </form>
        </div>
    )
}

export default CreateForm