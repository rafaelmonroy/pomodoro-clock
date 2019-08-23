import React from "react";
import ReactFCCtest from 'react-fcctest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faPause, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import "./styles.css";

function App() {
  return (
    <div className="App">
        <div className="container">
            <h1>Pomodoro Clock</h1>
            <div className="break-session">
                <div className="bs-child">
                    <h2 id="break-label" >Break Length</h2>
                    <div className="time-buttons">
                        <button id="break-increment"><FontAwesomeIcon icon={faArrowUp} /></button>
                        <p id="break-length">{5}</p>
                        <button id="break-decrement"><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                </div>
                <div className="bs-child">
                    <h2 id="session-label" >Session Length</h2>
                    <div className="time-buttons">
                        <button id="session-increment"><FontAwesomeIcon icon={faArrowUp} /></button>
                        <p id="session-length">{25}</p>
                        <button id="session-decrement"><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                </div>
            </div>
            <div className="timer">
                <p id="timer-label">Session</p>
                <p id="time-left">25:00</p>
            </div>
            <div className="ppr">
                <button id="start_stop"><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>
                <button id="reset"><FontAwesomeIcon icon={faSyncAlt} /></button>
            </div>
        </div>
        <ReactFCCtest />
    </div>
  );
}

export default App