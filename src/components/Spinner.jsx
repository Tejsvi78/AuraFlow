import React from 'react'
import './Spinner.css'

const Spinner = () => {
    return (
        <div id='loading'>
            <p>Loading...</p>
            <div className="spinner"></div>
        </div>
    )
}

export default Spinner
