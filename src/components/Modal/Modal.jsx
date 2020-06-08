import React, { useState } from 'react'
import myCSS from './Modal.module.css'

const Modal = ({ events, id, closeModal, deleteEvent }) => {
    return (
        <div className={myCSS.Modal}>
            <div className={myCSS.ModalBody}>
                <h2>Edit or delete the event</h2>
                {/* <form onSubmit={(e) => { e.preventDefault() }}>
                    <p>Name:</p>
                    <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <div className={myCSS.start}>
                        <p>Starts at:</p>
                        <input type='date' value={startsDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input type='time' value={startsTime} onChange={(e) => setStartTime(e.target.value)} />
                    </div>
                    <div className={myCSS.end}>
                        <p>Ends at:</p>
                        <input type='date' value={endsDate} onChange={(e) => setEndDate(e.target.value)} />
                        <input type='time' value={endsTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                    <div><button onClick={submitEvent}>Create</button></div>
                </form> */}
                <p>I am just a demo modal!</p>
                <button onClick={() => { deleteEvent(id) }}>Delete this event</button>
            </div>
        </div>
    )
}

export default Modal