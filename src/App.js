import React from "react";
import ReactFCCtest from 'react-fcctest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faPause, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import beep from './beeping.mp3'

import "./styles.css";
import moment from 'moment'

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            active: false,
            mode: 'Session',
            breakLength: 5,
            sessionLength: 25,
            sessionLeft: 25 * 60 * 1000,
            breakLeft: 5 * 60 * 1000
        }
    }

    play = () => {
        document.getElementById("beep").play();
    }

    componentDidUpdate(){
        if (this.state.sessionLeft === 0 || this.state.breakLeft === 0){
            this.play()
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
                    document.getElementById("beep").pause();
                    document.getElementById("beep").currentTime = 0;
                    clearInterval(this.myInterval)
                    this.setState({
                            active: false,
                            mode: "Session",
                            breakLength: 5,
                            sessionLength: 25,
                            sessionLeft: 25 * 60 * 1000,
                            breakLeft: 5 * 60 * 1000 
                    })
                break;
            case "start_stop":
                if (this.state.active === false) {
                    this.myInterval = setInterval(() => {
                        if (this.state.mode === 'Session' ){
                            this.setState({
                                active: true,
                                sessionLeft: this.state.sessionLeft - 1000,
                                mode: this.state.sessionLeft === 0 ? 'Break' : 'Session',
                                breakLeft: this.state.breakLength * 60 * 1000
                            })
                        } else if (this.state.mode === 'Break'){
                            this.play()
                            this.setState({
                                breakLeft: this.state.breakLeft - 1000,
                                mode: this.state.breakLeft === 0 ? 'Session' : 'Break',
                                sessionLeft: this.state.sessionLength * 60 * 1000
                            })
                        }
                    },1000)
                } else if (this.state.active === true){
                    this.setState(state => {
                        clearInterval(this.myInterval)
                        return {
                            active: state.active = false,
                        }
                    })   
                }
                break;
            default: 
            console.log("click another button")
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
                        <p id="timer-label">{this.state.mode}</p>
                        {this.state.mode === "Session" ? <p id="time-left">{moment(this.state.sessionLeft).format("mm:ss")}</p> : <p id="time-left">{moment(this.state.breakLeft).format("mm:ss")}</p>}
                        
                        
                    </div>
                    <div className="ppr">
                        <button id="start_stop" onClick={this.handleClick}><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>
                        <button id="reset" onClick={this.handleClick}><FontAwesomeIcon icon={faSyncAlt} /></button>
                        <audio src={beep} id="beep" />
                    </div>
                </div>
                <ReactFCCtest />
            </div>
          );
    }
}

export default App