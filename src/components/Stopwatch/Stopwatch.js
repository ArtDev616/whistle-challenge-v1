import React, { Component } from 'react';
import './Stopwatch.css';

import Timer from '../Timer';
import Controls from '../Controls';
import LapTimeList from '../LapTimeList';

import Config from '../../constants/config';

function getDefaultState() {
  return {
    isRunning : false,
    time : 0,
    timeList : [],
    lapList: [],
  }
}

class Stopwatch extends Component {

  constructor( props ) {
    super(props);
    this.state = getDefaultState();
    this.timerRef = null;
  }

  updateTimer(extraTime) {
    const { time } = this.state;
    this.setState({ time : time + extraTime });
  }

  start() {
    this.setState({
      isRunning : true 
    }, () => {
      this.timerRef = setInterval(
        () => { this.updateTimer( Config.updateInterval ) }, Config.updateInterval
      )
    });
  }

  stop() {
    this.setState({
      isRunning : false 
    }, () => {
      clearInterval(this.timerRef);
    });
  }

  reset() {
    this.setState({
      time : 0,
      timeList : [],
      lapList: []
    });
  }

  addLapTime() {
    const { time, timeList, lapList } = this.state;
    let laps = 0;

    
    if (timeList.length === 0) {
      laps = time;
    } else {
      laps = time - timeList[timeList.length - 1];
    }
    console.log("Stopwatch -> addLapTime -> laps", laps)
    console.log("Stopwatch -> addLapTime -> time", time)
    console.log("Stopwatch -> addLapTime -> timeList", timeList)

    this.setState({
      timeList : [ ...timeList, time ],
      lapList: [ ...lapList, laps ],
    });
  }

  render() {

    const { isRunning, time, lapList } = this.state;

    return (
      <div className="Stopwatch">

        <Timer time={ time } />

        <Controls
          isRunning={ isRunning } 
          start={ () => this.start() }
          stop={ () => this.stop() }
          reset={ () => this.reset() }
          addLapTime={ () => this.addLapTime() }
        />

        <LapTimeList timeList={ lapList } />
      </div>
    );
  }
}

export default Stopwatch;
