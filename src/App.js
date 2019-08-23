import React from "react";
import ReactFCCtest from 'react-fcctest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faPause, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import "./styles.css";
import moment from 'moment'

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timeLeft: 25 * 60 * 1000
        }
    }

    handleClick = (event) => {
        const {id} = event.currentTarget
        switch(id) {
            case "break-increment":
                this.setState(state => {
                    let {breakLength} = state
                    return {
                        breakLength: breakLength + 1
                    }
                })
                break;
            case "break-decrement":
                    this.setState(state => {
                        let {breakLength} = state
                        return {
                            breakLength: breakLength === 0 ?  breakLength = 0: breakLength - 1
                        }
                    })
                break;
            case "session-increment":
                    this.setState(state => {
                        let {sessionLength, timeLeft} = state
                        return {
                            sessionLength: sessionLength + 1,
                            timeLeft: timeLeft + 1
                        }
                    })
                    break;
            case "session-decrement":
                    this.setState(state => {
                        let {sessionLength, timeLeft} = state
                        return {
                            sessionLength: sessionLength === 0 ?  sessionLength = 0: sessionLength - 1,
                            timeLeft: timeLeft === 0 ?  timeLeft = 0: timeLeft - 1
                        }
                    })
                    break;
            default: 
            console.log("whoops")
        }
              
    }

    startStopTime = () => {
        this.myInterval = setInterval(() => {
            this.setState(state => ({
                timeLeft: state.timeLeft - 1000
            }))
        },1000)
    }

    render(){
        return (
            <div className="App">
                <div className="container">
                    <h1>Pomodoro Clock</h1>
                    <div className="break-session">
                        <div className="bs-child">
                            <h2 id="break-label" >Break Length</h2>
                            <div className="time-buttons">
                                <button id="break-increment" onClick={this.handleClick}><FontAwesomeIcon icon={faArrowUp} /></button>
                                <p id="break-length">{this.state.breakLength}</p>
                                <button id="break-decrement" onClick={this.handleClick}><FontAwesomeIcon icon={faArrowDown} /></button>
                            </div>
                        </div>
                        <div className="bs-child">
                            <h2 id="session-label" >Session Length</h2>
                            <div className="time-buttons">
                                <button id="session-increment" onClick={this.handleClick}><FontAwesomeIcon icon={faArrowUp} /></button>
                                <p id="session-length">{this.state.sessionLength}</p>
                                <button id="session-decrement" onClick={this.handleClick}><FontAwesomeIcon icon={faArrowDown} /></button>
                            </div>
                        </div>
                    </div>
                    <div className="timer">
                        <p id="timer-label">Session</p>
                        <p id="time-left">{moment(this.state.timeLeft).format("mm:ss")}</p>
                    </div>
                    <div className="ppr">
                        <button id="start_stop" onClick={this.startStopTime}><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>
                        <button id="reset"><FontAwesomeIcon icon={faSyncAlt} /></button>
                    </div>
                </div>
                <ReactFCCtest />
            </div>
          );
    }
}

export default App