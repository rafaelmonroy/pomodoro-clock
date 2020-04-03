import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faPlay,
  faPause,
  faSyncAlt
} from "@fortawesome/free-solid-svg-icons";
import beep from "./beeping.mp3";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
      mode: "Session",
      breakLength: 5,
      sessionLength: 25,
      sessionLeft: 25 * 60 * 1000,
      breakLeft: 5 * 60 * 1000
    };
  }

  play = () => {
    document.getElementById("beep").play();
  };

  componentDidUpdate() {
    if (this.state.sessionLeft === 0 || this.state.breakLeft === 0) {
      this.play();
    }
  }

  handleClick = event => {
    const { id } = event.currentTarget;
    switch (id) {
      case "break-increment":
        this.setState(state => {
          let { breakLength, breakLeft } = state;
          return {
            breakLength:
              breakLength === 60 ? (breakLength = 60) : breakLength + 1,
            breakLeft:
              breakLeft === 60 * 60 * 1000
                ? (breakLeft = 60 * 60 * 1000)
                : breakLeft + 60000
          };
        });
        break;
      case "break-decrement":
        this.setState(state => {
          let { breakLength, breakLeft } = state;
          return {
            breakLength:
              breakLength === 1 ? (breakLength = 1) : breakLength - 1,
            breakLeft:
              breakLeft === 1 * 60 * 1000
                ? (breakLeft = 1 * 60 * 1000)
                : breakLeft - 60000
          };
        });
        break;
      case "session-increment":
        this.setState(state => {
          let { sessionLength, sessionLeft } = state;
          return {
            sessionLength:
              sessionLength === 60 ? (sessionLength = 60) : sessionLength + 1,
            sessionLeft:
              sessionLeft === 60 * 60 * 1000
                ? (sessionLeft = 60 * 60 * 1000)
                : sessionLeft + 60000
          };
        });
        break;
      case "session-decrement":
        this.setState(state => {
          let { sessionLength, sessionLeft } = state;
          return {
            sessionLength:
              sessionLength === 1 ? (sessionLength = 1) : sessionLength - 1,
            sessionLeft:
              sessionLeft === 1 * 60 * 1000
                ? (sessionLeft = 1 * 60 * 1000)
                : sessionLeft - 60000
          };
        });
        break;
      case "reset":
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0;
        clearInterval(this.myInterval);
        this.setState({
          active: false,
          mode: "Session",
          breakLength: 5,
          sessionLength: 25,
          sessionLeft: 25 * 60 * 1000,
          breakLeft: 5 * 60 * 1000
        });
        break;
      case "start_stop":
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0;
        if (this.state.active === false) {
          this.myInterval = setInterval(() => {
            if (this.state.mode === "Session") {
              if (this.state.sessionLeft !== 0) {
                this.setState({
                  active: true,
                  sessionLeft: this.state.sessionLeft - 1000
                });
              } else if (this.state.sessionLeft === 0) {
                this.setState({
                  active: true,
                  sessionLeft: 0,
                  mode: "Break",
                  breakLeft: this.state.breakLength * 60 * 1000
                });
              }
            } else if (this.state.mode === "Break") {
              if (this.state.breakLeft !== 0) {
                this.setState({
                  active: true,
                  breakLeft: this.state.breakLeft - 1000
                });
              } else if (this.state.breakLeft === 0) {
                this.setState({
                  active: true,
                  breakLeft: 0,
                  mode: "Session",
                  sessionLeft: this.state.sessionLength * 60 * 1000
                });
              }
            }
          }, 1000);
        } else if (this.state.active === true) {
          this.setState(state => {
            clearInterval(this.myInterval);
            return {
              active: (state.active = false)
            };
          });
        }
        break;
      default:
        console.log("click another button");
    }
  };

  convertMilliseconds = (ms, p) => {
    let pattern = p,
      arrayPattern = pattern.split(":"),
      clock = [],
      minutes = Math.floor(ms / 60000), // 1 Minutes = 60000 Milliseconds
      seconds = Math.floor(((ms % 360000) % 60000) / 1000); // 1 Second = 1000 Milliseconds
    // build the clock result
    function createClock(unit) {
      // match the pattern to the corresponding variable
      if (pattern.match(unit)) {
        if (unit.match(/mm/)) {
          addUnitToClock(minutes, unit);
        }
        if (unit.match(/ss/)) {
          addUnitToClock(seconds, unit);
        }
      }
    }
    function addUnitToClock(val, unit) {
      if (val < 10 && unit.length === 2) {
        val = "0" + val;
      }
      clock.push(val); // push the values into the clock array
    }
    // loop over the pattern building out the clock result
    for (var i = 0, j = arrayPattern.length; i < j; i++) {
      createClock(arrayPattern[i]);
    }
    return clock.join(":");
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Pomodoro Clock</h1>
          <div className="break-session">
            <div className="bs-child">
              <h2 id="break-label">Break Length</h2>
              <div className="time-buttons">
                <button id="break-increment" onClick={this.handleClick}>
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <p id="break-length">{this.state.breakLength}</p>
                <button id="break-decrement" onClick={this.handleClick}>
                  <FontAwesomeIcon icon={faArrowDown} />
                </button>
              </div>
            </div>
            <div className="bs-child">
              <h2 id="session-label">Session Length</h2>
              <div className="time-buttons">
                <button id="session-increment" onClick={this.handleClick}>
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <p id="session-length">{this.state.sessionLength}</p>
                <button id="session-decrement" onClick={this.handleClick}>
                  <FontAwesomeIcon icon={faArrowDown} />
                </button>
              </div>
            </div>
          </div>
          <div className="timer">
            <p id="timer-label">{this.state.mode}</p>
            {this.state.mode === "Session" ? (
              <p id="time-left">
                {this.convertMilliseconds(this.state.sessionLeft, "mm:ss")}
              </p>
            ) : (
              <p id="time-left">
                {this.convertMilliseconds(this.state.breakLeft, "mm:ss")}
              </p>
            )}
          </div>
          <div className="ppr">
            <button id="start_stop" onClick={this.handleClick}>
              <FontAwesomeIcon icon={faPlay} />
              <FontAwesomeIcon icon={faPause} />
            </button>
            <button id="reset" onClick={this.handleClick}>
              <FontAwesomeIcon icon={faSyncAlt} />
            </button>
            <audio src={beep} id="beep" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
