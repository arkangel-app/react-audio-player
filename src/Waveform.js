import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import {Icon,Row,Col} from 'antd';
let current="00:01"

class Waveform extends Component {  
  state = {
    playing: false,
    currentTime: 0,
    duration: "",
    flag : false
  };

  componentDidMount() {
  
    this.waveform = WaveSurfer.create({
      barWidth: 5,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 130,
      progressColor: '#2A8BF2',
      barRadius:3,
      barGap:3,
      responsive: true,
      waveColor: '#C4DEFC',
      cursorColor: 'transparent',
      maxCanvasWidth:400,
      hideScrollbar:true,
    });

    this.waveform.load('https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3');
    console.log(this.waveform.getDuration())
  };

  
    secondsToTimestamp(seconds) {
      seconds = Math.floor(seconds);
      var h = Math.floor(seconds / 3600);
      var m = Math.floor((seconds - (h * 3600)) / 60);
      var s = seconds - (h * 3600) - (m * 60);

      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      return  m + ':' + s;
    }
  
  handlePlay = () => {
    //console.log(this.waveform)
    let duration = this.state.duration
    if(this.state.flag==false){
      duration = this.secondsToTimestamp(this.waveform.getDuration()) 
      console.log(duration)
    }
    if(this.waveform.isPlaying()) {
      let tiempo = this.secondsToTimestamp(this.waveform.getCurrentTime())
      current = tiempo
  
      
    }
    this.setState({ playing: !this.state.playing, flag: true, duration });
    this.waveform.playPause();
  };

 currentTime= () => {
 
    
  } 
  
  render() {
    const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';

    return (

      <div className="body">

          <Row gutter={16} >
          <div className="frame">
            <Col md={2} xs={0}>
            <div className="profile">
            <div className="circle">LR</div>
            </div>
            </Col>
            <Col md={22} xs={24}>
        
            <div className="reproBox">
              <div className="waveformContianer">
                  <a onClick={this.handlePlay} className="playButton" >
                    {!this.state.playing ? <Icon type="caret-right"className="icons" /> : <Icon type="pause"className="icons" />}
                  </a>
                  <div id="waveform"> </div>

              </div>
              <div className="remaining"> {this.state.flag?current:""} </div>
            </div>
              <div className="data"> Luis Rodriguez <span className="bar">|</span> {this.state.duration} </div>
            
           </Col>
           </div>

          </Row>

      </div>
    );
  }
};

export default Waveform;