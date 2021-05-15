/* global chrome */

import React, { Component } from 'react';

import vibrationYes from './imgComponents/VibrationYes.png';
import vibrationNo from './imgComponents/VibrationNo.png';

import './settingsComponents.css';


class VibrationAccess extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classVibrationAccess : null,
        textVibrationAccess : null,
        pictureVibrationAccess : null,
        vibrate : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.vibrate)
    {
      this.state = ({
        classVibrationAccess:  true,
        textVibrationAccess: true,
        pictureVibrationAccess: true,
        vibrate: true});
    }
    else
    {
      this.state = ({
        classVibrationAccess: false,
        textVibrationAccess: false,
        pictureVibrationAccess: false,
        vibrate: false});
    }
  }

  render () {
    let btnVibrationAccess = this.state.classVibrationAccess ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtVibrationAccess = this.state.textVibrationAccess ? "On" : "Off";
    let picVibrationAccess = this.state.pictureVibrationAccess ? vibrationYes : vibrationNo;
    let settingVibrationAccess = this.state.vibrate ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Vibration" : "Πρόσβαση στη";
    let elementTextPart2 = this.props.savedUserSettings.language == 'en'  ? "Access" : "Δόνηση";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable the vibration of the device." : "Απενεργοποιήστε τη δόνηση της συσκευής."

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picVibrationAccess} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">{elementTextPart1}<br />{elementTextPart2}</h5></div>
              <div><button type="button"className={btnVibrationAccess}
              onClick={() => this.onChangeVibrationAccess()}>{txtVibrationAccess}</button></div>
            </div>
        </div>

    )

  }


 onChangeVibrationAccess () {
   this.setState({classVibrationAccess: !this.state.classVibrationAccess})
   this.setState({textVibrationAccess: !this.state.textVibrationAccess});
   this.setState({pictureVibrationAccess: !this.state.pictureVibrationAccess});
   this.setState({vibrate: !this.state.vibrate});
   this.props.parentCallback(!this.state.vibrate);
 }

}


export default VibrationAccess
