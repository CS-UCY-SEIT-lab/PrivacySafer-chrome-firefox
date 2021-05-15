/* global chrome */

import React, { Component } from 'react';

import brightYes from './imgComponents/BrightnessYess.png';
import brightNo from './imgComponents/BrightnessNo.png';

import './settingsComponents.css';


class Brightness extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classBrightness : null,
        textBrightness : null,
        pictureBrightness : null,
        devicelight : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.devicelight)
    {
      this.state = ({
          classBrightness : true,
          textBrightness : true,
          pictureBrightness : true,
          devicelight : true});
    }
    else
    {
      this.state = ({
        classBrightness: false,
        textBrightness: false,
        pictureBrightness: false,
        devicelight: false});
    }
  }

  render () {
    let btnBrightness = this.state.classBrightness ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtBrightness = this.state.textBrightness ? "On" : "Off";
    let picBrightness = this.state.pictureBrightness ? brightYes : brightNo;
    let settingBrightness = this.state.devicelight ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Brightness" : "Φωτεινότητα";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable access to the level of brightness of the screen."  : "Απενεργοποιήστε τη πρόσβαση στο επίπεδο φωτεινότητας της οθόνης."

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picBrightness} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle"><span className="redstar">*</span>{elementTextPart1}<br/><br/></h5></div>
              <div><button type="button"className={btnBrightness}
              onClick={() => this.onChangeBrightness()}>{txtBrightness}</button></div>
            </div>
        </div>

    )

  }


 onChangeBrightness () {
   this.setState({classBrightness: !this.state.classBrightness})
   this.setState({textBrightness: !this.state.textBrightness});
   this.setState({pictureBrightness: !this.state.pictureBrightness});
   this.setState({devicelight: !this.state.devicelight});
   this.props.parentCallback(!this.state.devicelight);
 }

}


export default Brightness
