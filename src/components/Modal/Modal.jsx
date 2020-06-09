import React from 'react'
import myCSS from './Modal.module.css'
import CreateForm from '../Calendar/CreateForm/CreateForm'

const Modal = ({ events, id, deleteEvent, handleNewEventData, closeModal }) => {
    let event
    if (id) {
        event = events.filter(evt => evt.id === id)[0]
    }

    return (
        <div className={myCSS.Modal}>
            <div className={myCSS.ModalBody}>
                {!id ? <>
                    <h3>Create new event</h3>
                    <CreateForm handleNewEventData={handleNewEventData} edit={false} closeModal={closeModal} />
                </>
                    : <>
                        <h3>Edit or delete the event</h3>
                        <CreateForm handleNewEventData={handleNewEventData} edit={true} event={event} closeModal={closeModal} />
                    </>
                }
                {id && <div>
                    <hr />
                    <button className={myCSS.Button} onClick={() => { deleteEvent(id) }}>Delete this event</button>
                </div>}
            </div>
        </div>
    )
}

export default Modal