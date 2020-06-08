import React from 'react'
import myCSS from './Day.module.css'

const Day = ({ day }) => {
    return (
        <div className={myCSS.Day}>
            <strong>{day}</strong>
            <hr />
        </div>
    )
}

export default Day