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
            play: false,
            breakLength: 5,
            sessionLength: 25,
            sessionLeft: 25 * 60 * 1000,
            breakLeft: 5 * 60 * 1000
        }
    }

    handleClick = (event) => {
        const {id} = event.currentTarget
        switch(id) {
            case "break-increment":
                this.setState(state => {
                    let {breakLength, breakLeft} = state
                    return {
                        breakLength: breakLength === 60 ?  breakLength = 60: breakLength + 1,
                        breakLeft: breakLeft === 60 * 60 * 1000 ?  breakLeft = 60 * 60 * 1000: breakLeft + 60000
                    }
                })
                break;
            case "break-decrement":
                    this.setState(state => {
                        let {breakLength, breakLeft} = state
                        return {
                            breakLength: breakLength === 1 ?  breakLength = 1: breakLength - 1,
                            breakLeft: breakLeft === 1 * 60 * 1000 ?  breakLeft = 1 * 60 * 1000 : breakLeft - 60000
                        }
                    })
                break;
            case "session-increment":
                    this.setState(state => {
                        let {sessionLength, sessionLeft} = state
                        return {
                            sessionLength: sessionLength === 60 ?  sessionLength = 60: sessionLength + 1,
                            sessionLeft: sessionLeft === 60 * 60 * 1000 ?  sessionLeft = 60 * 60 * 1000: sessionLeft + 60000
                        }
                    })
                    break;
            case "session-decrement":
                    this.setState(state => {
                        let {sessionLength, sessionLeft} = state
                        return {
                            sessionLength: sessionLength === 1 ?  sessionLength = 1: sessionLength - 1,
                            sessionLeft: sessionLeft === 1 * 60 * 1000 ?  sessionLeft = 1 * 60 * 1000 : sessionLeft - 60000
                        }
                    })
                    break;
            case "reset":
                    this.setState(state => {
                        clearInterval(this.myInterval)
                        return {
                            play: false,
                            breakLength: 5,
                            sessionLength: 25,
                            sessionLeft: 25 * 60 * 1000,
                            breakLeft: 5 * 60 * 1000
                        }
                       
                    })
                    break;
            default: 
            console.log("whoops")
        }
              
    }

    startStopTime = () => {
        let {play} = this.state
        if (play === false) {
            this.myInterval = setInterval(() => {
                if (this.state.sessionLeft >= 1000){
                    this.setState(state => {
                        let {sessionLeft} = state
                        return {
                            sessionLeft: sessionLeft - 1000,
                            play: true
                        }     
                    })
                } else if (this.state.sessionLeft === 0){
                    this.setState(state => {
                        return {
                            sessionLeft: 0,
                            breakLeft: state.breakLeft === 0 ? state.breakLeft = 0 : state.breakLeft - 1000,
                            play: true  
                        }       
                    })
                }
            },1000)
        } else if (play === true){
            this.setState(state => {
                clearInterval(this.myInterval)
                return {
                    play: state.play = false,
                }
            })   
        }  
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
                        {this.state.sessionLeft >= 1000 ? <p id="timer-label">Session</p> : <p id="timer-label">Break</p>}
                        {this.state.sessionLeft >= 1000 ? <p id="time-left">{moment(this.state.sessionLeft).format("mm:ss")}</p> : <p id="time-left">{moment(this.state.breakLeft).format("mm:ss")}</p>}
                        
                    </div>
                    <div className="ppr">
                        <button id="start_stop" onClick={this.startStopTime}><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>
                        <button id="reset" onClick={this.handleClick}><FontAwesomeIcon icon={faSyncAlt} /></button>
                    </div>
                </div>
                <ReactFCCtest />
            </div>
          );
    }
}

export default App